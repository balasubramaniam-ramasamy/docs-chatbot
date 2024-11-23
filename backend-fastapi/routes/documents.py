from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from database import get_session
from models import Document
from schemas import DocumentCreate, DocumentResponse, QueryRequest
from llm_engine import get_relevant_documents
import os
os.environ['REQUESTS_CA_BUNDLE']= "C:\WorkNew\ZscalerRootCerttificate.pem"

router = APIRouter(prefix="/documents", tags=["Documents"])

@router.post("/", response_model=DocumentResponse)
def upload_document(doc: DocumentCreate, session: Session = Depends(get_session)):
    """Endpoint to upload a new document."""
    db_doc = Document(title=doc.title, content=doc.content, user_id=doc.user_id)
    session.add(db_doc)
    session.commit()
    session.refresh(db_doc)
    return db_doc

@router.get("/{user_id}", response_model=list[DocumentResponse])
def get_user_documents(user_id: int, session: Session = Depends(get_session)):
    """Retrieve a list of documents for a given user."""
    documents = session.query(Document).filter(Document.user_id == user_id).all()
    if not documents:
        raise HTTPException(status_code=404, detail="No documents found for this user")
    return documents

@router.post("/query", response_model=str)
def query_documents(query_request: QueryRequest, session: Session = Depends(get_session)):
    """
    Endpoint to query multiple documents and return the most relevant response.
    """
    # Fetch documents based on provided IDs
    documents = session.query(Document).filter(Document.id.in_(query_request.document_ids)).all()
    
    if not documents:
        raise HTTPException(status_code=404, detail="No documents found for the provided IDs")
    
    # Extract document content
    document_contents = [doc.content for doc in documents]
    
    # Use the LLM engine to find the most relevant response
    response = get_relevant_documents(document_contents, query_request.query)
    return response
