from fastapi import APIRouter, Depends, HTTPException
import crud, schemas, database
from typing import List

router = APIRouter(
    prefix="/course_target",
    tags=["course_target"],
)


@router.post("/", response_model=schemas.CourseTarget)
def create_course_target(target: schemas.CourseTargetCreate):
    return crud.create_course_target(target=target)


@router.get("/{course_id}", response_model=List[schemas.CourseTarget])
def read_course_targets(course_id: int):
    return crud.get_course_targets(course_id=course_id)
