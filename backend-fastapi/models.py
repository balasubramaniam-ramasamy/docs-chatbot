from sqlmodel import SQLModel, Field

class Document(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    title: str
    content: str
    user_id: int
    # = Field(foreign_key="users.id")  # Refers to 'id' in the 'users' table

# Note: We already have a 'users' table defined in backend-nodejs; we will not touch it.
