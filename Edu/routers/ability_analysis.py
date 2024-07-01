from fastapi import APIRouter, Depends, HTTPException
import crud, schemas, database
from typing import List

router = APIRouter(
    prefix="/ability_analysis",
    tags=["ability_analysis"],
)


@router.post("/", response_model=schemas.AbilityAnalysis)
def create_ability_analysis(analysis: schemas.AbilityAnalysisCreate):
    return crud.create_ability_analysis(analysis=analysis)


@router.get("/{user_id}", response_model=List[schemas.AbilityAnalysis])
def read_ability_analysis(user_id: int):
    return crud.get_ability_analysis(user_id=user_id)
