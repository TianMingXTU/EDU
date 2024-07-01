from fastapi import APIRouter, HTTPException, Depends
from typing import List
import crud, schemas

router = APIRouter(
    prefix="/chat_room_user",
    tags=["chat_room_user"],
)


@router.get("/users/{user_id}/rooms", response_model=List[schemas.UserRoom])
def get_user_rooms(user_id: int):
    user_rooms = crud.get_user_rooms(user_id=user_id)
    return list(user_rooms)


@router.post("/", response_model=schemas.UserRoom)
def create_user_room(user_room: schemas.UserRoomCreate):
    db_user_room = crud.create_user_room(user_room=user_room)
    return db_user_room
