from fastapi import APIRouter, HTTPException, Depends
from typing import List
from pydantic import BaseModel
import crud, schemas
from models import ChatRoom, Message

router = APIRouter(
    prefix="/chat",
    tags=["chat"],
)


class MessageCreate(BaseModel):
    room: int
    user: int
    message: str


@router.get("/rooms/{room_id}/messages", response_model=List[schemas.Message])
def get_messages(room_id: int, skip: int = 0, limit: int = 10):
    messages = crud.get_messages(room_id=room_id, skip=skip, limit=limit)
    return list(messages)


@router.post("/rooms/{room_id}/messages", response_model=schemas.Message)
def create_message(message: MessageCreate):
    db_message = crud.create_message(message=message)
    return db_message
