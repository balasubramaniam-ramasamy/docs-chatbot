from fastapi import FastAPI
from database import create_db_and_tables
from routes import documents
import os
os.environ['REQUESTS_CA_BUNDLE']= "C:\WorkNew\ZscalerRootCerttificate.pem"


from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow all origins or specify a list of origins
origins = [
    "http://localhost",  # Frontend URL
    "http://localhost:4200",  # If you're using React, for example
    # You can add more origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow these origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

app.include_router(documents.router)

@app.on_event("startup")
def on_startup():
    print("on_startup")
    create_db_and_tables()

@app.get("/")
def root():
    return {"message": "Welcome to the Document Management API!"}
