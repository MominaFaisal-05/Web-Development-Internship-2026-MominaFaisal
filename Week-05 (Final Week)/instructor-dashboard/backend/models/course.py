from pydantic import BaseModel
from typing import Optional


class CourseCreate(BaseModel):
    title: str
    description: str
    level: str = "Beginner"
    instructor_email: Optional[str] = None