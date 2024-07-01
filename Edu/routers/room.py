from fastapi import APIRouter, HTTPException, Depends
from typing import List
import crud, schemas

router = APIRouter(
    prefix="/rooms",
    tags=["rooms"],
)


@router.get("/", response_model=List[schemas.ChatRoom])
def get_chat_rooms(skip: int = 0, limit: int = 10):
    chat_rooms = crud.get_chat_rooms(skip=skip, limit=limit)
    return list(chat_rooms)


@router.post("/", response_model=schemas.ChatRoom)
def create_chat_room(room: schemas.ChatRoomCreate):
    db_room = crud.create_chat_room(room=room)
    return db_room
