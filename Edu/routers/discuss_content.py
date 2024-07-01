from fastapi import APIRouter, Depends, HTTPException
import crud, schemas, database
from typing import List

router = APIRouter(
    prefix="/discuss_content",
    tags=["discuss_content"],
)


@router.post("/", response_model=schemas.DiscussContent)
def create_discussion_content(content: schemas.DiscussContentCreate):
    return crud.create_discussion_content(content=content)


@router.get("/{discuss_id}", response_model=List[schemas.DiscussContent])
def read_discussion_contents(discuss_id: int):
    return crud.get_discussion_contents(discuss_id=discuss_id)
