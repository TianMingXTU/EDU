from fastapi import APIRouter, Depends, HTTPException
import crud, schemas, database
from typing import List

router = APIRouter(
    prefix="/discuss",
    tags=["discuss"],
)


@router.post("/", response_model=schemas.Discuss)
def create_discussion(discuss: schemas.DiscussCreate):
    return crud.create_discussion(discuss=discuss)


@router.get("/{room_id}", response_model=List[schemas.Discuss])
def read_discussions(room_id: str):
    return crud.get_discussions(room_id=room_id)
