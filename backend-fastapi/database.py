from sqlmodel import SQLModel, create_engine, Session
import os
os.environ['REQUESTS_CA_BUNDLE']= "C:\WorkNew\ZscalerRootCerttificate.pem"

from pathlib import Path

# Define the relative path
db_path = Path("./../database/database.sqlite")
db_url = f"sqlite:///{db_path.resolve()}"
DATABASE_URL = db_url
print("db_url ", db_url)
engine = create_engine(DATABASE_URL)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
