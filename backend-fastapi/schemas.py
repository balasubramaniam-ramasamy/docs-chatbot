from typing import List
from pydantic import BaseModel

# Document Upload
class DocumentCreate(BaseModel):
    title: str
    content: str
    user_id: int

# Get Documents
class DocumentResponse(BaseModel):
    id: int
    title: str
    content: str

    class Config:
        orm_mode = True

# Query Documents
class QueryRequest(BaseModel):
    document_ids: List[int]  # Accept a list of document IDs
    query: str
