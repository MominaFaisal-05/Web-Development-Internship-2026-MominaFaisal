from datetime import datetime, timedelta

from fastapi import APIRouter, HTTPException

from jose import jwt
from passlib.context import CryptContext

from models.user import UserCreate, UserLogin
from database.connection import users_collection


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

SECRET_KEY = "digital-skills-platform-secret"

ALGORITHM = "HS256"

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def create_access_token(data: dict):
    payload = data.copy()

    expire = datetime.utcnow() + timedelta(
        hours=8
    )

    payload.update({
        "exp": expire
    })

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


@router.post("/register")
def register(user: UserCreate):

    existing_user = users_collection.find_one({
        "email": user.email
    })

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered."
        )

    hashed_password = pwd_context.hash(
        user.password
    )

    user_document = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "role": user.role
    }

    users_collection.insert_one(
        user_document
    )

    return {
        "message": "User registered successfully."
    }


@router.post("/login")
def login(user: UserLogin):

    database_user = users_collection.find_one({
        "email": user.email
    })

    if not database_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    password_correct = pwd_context.verify(
        user.password,
        database_user["password"]
    )

    if not password_correct:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    token = create_access_token({
        "sub": database_user["email"],
        "role": database_user["role"]
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "name": database_user["name"],
            "email": database_user["email"],
            "role": database_user["role"]
        }
    }