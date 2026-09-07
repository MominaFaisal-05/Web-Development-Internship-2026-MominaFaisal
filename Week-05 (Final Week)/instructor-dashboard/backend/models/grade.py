from pydantic import BaseModel
from typing import Optional


class GradeCreate(BaseModel):
    student_email: str
    course_title: str
    assignment: str
    score: Optional[int] = None