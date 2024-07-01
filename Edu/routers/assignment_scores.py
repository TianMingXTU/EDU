from fastapi import APIRouter, Depends, HTTPException
import crud, schemas, database
from typing import List

router = APIRouter(
    prefix="/assignment_scores",
    tags=["assignment_scores"],
)


@router.post("/", response_model=schemas.AssignmentScore)
def create_assignment_score(score: schemas.AssignmentScoreCreate):
    return crud.create_assignment_score(score=score)


@router.get("/{assignment_id}", response_model=List[schemas.AssignmentScore])
def read_assignment_scores(assignment_id: int):
    return crud.get_assignment_scores(assignment_id=assignment_id)
