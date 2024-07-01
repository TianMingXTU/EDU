from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from peewee import *
from typing import List, Dict
import random
import string
from datetime import datetime
from pydantic import BaseModel

DATABASE = {
    "name": "chatchat",
    "engine": "peewee.MySQLDatabase",
    "user": "root",
    "password": "qin2002.",
    "host": "localhost",
    "port": 3306,
}

db = MySQLDatabase(
    DATABASE["name"],
    user=DATABASE["user"],
    password=DATABASE["password"],
    host=DATABASE["host"],
    port=DATABASE["port"],
)


class BaseModelPeewee(Model):
    class Meta:
        database = db


class UserRoom(BaseModelPeewee):
    user_id = CharField()
    room_id = CharField()
    room_name = CharField()
    operation_time = DateTimeField(default=datetime.now)


class ChatMessage(BaseModelPeewee):
    room_id = CharField()
    user_id = CharField()
    nickname = CharField()
    message = TextField()
    timestamp = DateTimeField(default=datetime.now)


db.connect()
db.create_tables([UserRoom, ChatMessage])

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CreateRoomRequest(BaseModel):
    user_id: str
    room_name: str


class JoinRoomRequest(BaseModel):
    user_id: str
    invite_code: str


class DeleteRoomRequest(BaseModel):
    user_id: str
    room_id: str


# 存储聊天室和用户信息
chat_rooms: Dict[str, List[WebSocket]] = {}


# 生成六位邀请码
def generate_invite_code() -> str:
    return "".join(random.choices(string.ascii_uppercase + string.digits, k=6))


@app.post("/create_room")
async def create_room(request: CreateRoomRequest):
    room_id = generate_invite_code()
    while UserRoom.select().where(UserRoom.room_id == room_id).exists():
        room_id = generate_invite_code()

    UserRoom.create(
        user_id=request.user_id, room_id=room_id, room_name=request.room_name
    )
    return {"invite_code": room_id}


@app.post("/join_room")
async def join_room(request: JoinRoomRequest):
    room = UserRoom.get_or_none(UserRoom.room_id == request.invite_code)
    if room:
        if (
            not UserRoom.select()
            .where(
                (UserRoom.user_id == request.user_id)
                & (UserRoom.room_id == request.invite_code)
            )
            .exists()
        ):
            UserRoom.create(
                user_id=request.user_id,
                room_id=request.invite_code,
                room_name=room.room_name,
            )
        messages = (
            ChatMessage.select()
            .where(ChatMessage.room_id == request.invite_code)
            .order_by(ChatMessage.timestamp)
        )
        history = [
            {
                "user_id": msg.user_id,
                "nickname": msg.nickname,
                "message": msg.message.split("@username")[0],
                "timestamp": msg.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
            }
            for msg in messages
        ]
        return {
            "success": True,
            "chatroom_id": request.invite_code,
            "room_name": room.room_name,
            "history": history,
        }
    return {"success": False}


@app.get("/get_user_rooms/{user_id}")
async def get_user_rooms(user_id: str):
    user_rooms = UserRoom.select().where(UserRoom.user_id == user_id)
    rooms = [
        {"room_id": room.room_id, "room_name": room.room_name} for room in user_rooms
    ]
    return {"rooms": rooms}


@app.get("/get_room_members/{room_id}")
async def get_room_members(room_id: str):
    member_count = UserRoom.select().where(UserRoom.room_id == room_id).count()
    return {"member_count": member_count}


@app.post("/delete_room")
async def delete_room(request: DeleteRoomRequest):
    room = UserRoom.get_or_none(
        (UserRoom.user_id == request.user_id) & (UserRoom.room_id == request.room_id)
    )
    if room:
        room.delete_instance()
        return {"success": True}
    return {"success": False, "message": "Room not found or not owned by user"}


@app.get("/get_private_history/{user_id}")
async def get_private_history(user_id: str):
    messages = (
        ChatMessage.select()
        .where(ChatMessage.room_id == user_id)
        .order_by(ChatMessage.timestamp)
    )
    history = [
        {
            "user_id": msg.user_id,
            "nickname": msg.nickname,
            "message": msg.message.split("@username")[0],
            "timestamp": msg.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
        }
        for msg in messages
    ]
    return {"success": True, "history": history}


# WebSocket连接处理
@app.websocket("/ws/{nickname}")
async def websocket_endpoint(websocket: WebSocket, nickname: str):
    await websocket.accept()
    room_id = None

    try:
        while True:
            data = await websocket.receive_text()
            if data.startswith("+@切换"):
                new_room_id = data.split("+@切换")[1]
                if room_id:
                    chat_rooms[room_id].remove(websocket)
                room_id = new_room_id
                if room_id not in chat_rooms:
                    chat_rooms[room_id] = []
                chat_rooms[room_id].append(websocket)
                await notify_users(room_id, f"{nickname} 加入了聊天室", "join")
                await update_member_count(room_id)
            else:
                if room_id:
                    ChatMessage.create(
                        room_id=room_id,
                        user_id=nickname,
                        nickname=nickname,
                        message=data,
                    )
                    await notify_users(room_id, f"{nickname}: {data}")
    except WebSocketDisconnect:
        if room_id and websocket in chat_rooms[room_id]:
            chat_rooms[room_id].remove(websocket)
            await notify_users(room_id, f"{nickname} 离开了聊天室", "leave")
            await update_member_count(room_id)


async def notify_users(room_id: str, message: str, event_type: str = "message"):
    if room_id in chat_rooms:
        for connection in chat_rooms[room_id]:
            await connection.send_text(message)


async def update_member_count(room_id: str):
    member_count = UserRoom.select().where(UserRoom.room_id == room_id).count()
    if room_id in chat_rooms:
        for connection in chat_rooms[room_id]:
            await connection.send_text(f"@member_number{member_count}")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8080)
