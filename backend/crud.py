from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from typing import Optional, Tuple, List
import models, schemas


def get_posts(
    db: Session,
    search: Optional[str] = None,
    category: Optional[str] = None,
    page: int = 1,
    limit: int = 10,
) -> Tuple[List[models.Post], int]:
    query = db.query(models.Post)

    if search:
        query = query.filter(
            or_(
                models.Post.title.ilike(f"%{search}%"),
                models.Post.description.ilike(f"%{search}%"),
            )
        )

    if category:
        query = query.filter(models.Post.category == category)

    total = query.count()
    posts = (
        query.order_by(models.Post.created_at.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )
    return posts, total


def get_posts_by_user(
    db: Session,
    user_id: str,
    page: int = 1,
    limit: int = 10,
) -> Tuple[List[models.Post], int]:
    query = db.query(models.Post).filter(models.Post.user_id == user_id)
    total = query.count()
    posts = (
        query.order_by(models.Post.created_at.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )
    return posts, total


def create_post(db: Session, post: schemas.PostCreate) -> models.Post:
    db_post = models.Post(
        title=post.title,
        description=post.description,
        category=post.category,
        user_id=post.user_id,
        user_email=post.user_email,
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


def delete_post(db: Session, post_id: int, user_id: str) -> bool:
    post = (
        db.query(models.Post)
        .filter(models.Post.id == post_id, models.Post.user_id == user_id)
        .first()
    )
    if not post:
        return False
    db.delete(post)
    db.commit()
    return True


def get_categories(db: Session) -> List[str]:
    categories = db.query(models.Post.category).distinct().all()
    return [c[0] for c in categories]
