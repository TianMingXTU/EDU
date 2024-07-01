from fastapi import APIRouter, Depends, HTTPException
import crud, schemas, database
from typing import List

router = APIRouter(
    prefix="/knowledge_base",
    tags=["knowledge_base"],
)


@router.post("/", response_model=schemas.KnowledgeBase)
def create_knowledge_base(base: schemas.KnowledgeBaseCreate):
    return crud.create_knowledge_base(base=base)


@router.get("/{course_id}", response_model=List[schemas.KnowledgeBase])
def read_knowledge_base(course_id: int):
    return crud.get_knowledge_base(course_id=course_id)
