from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Optional
import models, schemas, crud
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Posts Catalog API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Posts Catalog API", "status": "running"}


@app.get("/posts", response_model=schemas.PostsResponse)
def get_posts(
    search: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    posts, total = crud.get_posts(db, search=search, category=category, page=page, limit=limit)
    return {"posts": posts, "total": total, "page": page, "limit": limit}


@app.get("/posts/my", response_model=schemas.PostsResponse)
def get_my_posts(
    user_id: str = Query(...),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    posts, total = crud.get_posts_by_user(db, user_id=user_id, page=page, limit=limit)
    return {"posts": posts, "total": total, "page": page, "limit": limit}


@app.post("/posts", response_model=schemas.Post, status_code=201)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db)):
    return crud.create_post(db, post)


@app.delete("/posts/{post_id}", status_code=204)
def delete_post(post_id: int, user_id: str = Query(...), db: Session = Depends(get_db)):
    success = crud.delete_post(db, post_id=post_id, user_id=user_id)
    if not success:
        raise HTTPException(status_code=404, detail="Post not found or unauthorized")


@app.get("/categories", response_model=list[str])
def get_categories(db: Session = Depends(get_db)):
    return crud.get_categories(db)
