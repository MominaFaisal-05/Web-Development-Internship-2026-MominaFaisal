from pydantic import BaseModel


class ProgressCreate(BaseModel):
    student_email: str
    course_title: str
    progress: int