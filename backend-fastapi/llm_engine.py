from sentence_transformers import SentenceTransformer, util
from typing import List

# Initialize sentence transformer model for document embeddings
import os
os.environ['REQUESTS_CA_BUNDLE']= "C:\WorkNew\ZscalerRootCerttificate.pem"

model = SentenceTransformer("all-MiniLM-L6-v2")

# Simple function to retrieve the most relevant document and process the query
def get_relevant_documents(documents: List[str], query: str) -> str:
    """
    Process multiple documents and return the most relevant passage for the query.
    """
    query_embedding = model.encode(query, convert_to_tensor=True)
    document_embeddings = [model.encode(doc, convert_to_tensor=True) for doc in documents]
    
    # Compute similarity scores between the query and each document
    scores = [util.cos_sim(query_embedding, doc_emb).item() for doc_emb in document_embeddings]
    best_match = documents[scores.index(max(scores))]
    
    return best_match
