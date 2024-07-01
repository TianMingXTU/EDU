from fastapi import APIRouter, Depends, HTTPException
import crud, schemas, database
from typing import List

router = APIRouter(
    prefix="/assignments",
    tags=["assignments"],
)


@router.post("/", response_model=schemas.Assignment)
def create_assignment(assignment: schemas.AssignmentCreate):
    return crud.create_assignment(assignment=assignment)


@router.get("/{course_id}", response_model=List[schemas.Assignment])
def read_assignments(course_id: int):
    return crud.get_assignments(course_id=course_id)
