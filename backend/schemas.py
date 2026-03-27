from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List


class PostCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1)
    category: str = Field(..., min_length=1, max_length=100)
    user_id: str = Field(..., min_length=1)
    user_email: Optional[str] = None


class Post(BaseModel):
    id: int
    title: str
    description: str
    category: str
    user_id: str
    user_email: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class PostsResponse(BaseModel):
    posts: List[Post]
    total: int
    page: int
    limit: int
