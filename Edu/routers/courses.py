from fastapi import APIRouter, Depends, HTTPException
import crud, schemas, database
from typing import List

router = APIRouter(
    prefix="/courses",
    tags=["courses"],
)


@router.post("/", response_model=schemas.Course)
def create_course(course: schemas.CourseCreate):
    return crud.create_course(course=course)


@router.get("/", response_model=List[schemas.Course])
def read_courses(skip: int = 0, limit: int = 10):
    return crud.get_courses(skip=skip, limit=limit)
