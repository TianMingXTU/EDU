from fastapi import APIRouter, Depends, HTTPException
import crud, schemas, database
from typing import List

router = APIRouter(
    prefix="/knowledge_documents",
    tags=["knowledge_documents"],
)


@router.post("/", response_model=schemas.KnowledgeDocument)
def create_knowledge_document(doc: schemas.KnowledgeDocumentCreate):
    return crud.create_knowledge_document(doc=doc)


@router.get("/{knowledge_base_id}", response_model=List[schemas.KnowledgeDocument])
def read_knowledge_documents(knowledge_base_id: int):
    return crud.get_knowledge_documents(knowledge_base_id=knowledge_base_id)
