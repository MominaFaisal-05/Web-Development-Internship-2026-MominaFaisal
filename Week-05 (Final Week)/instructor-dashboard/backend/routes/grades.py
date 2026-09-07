from fastapi import APIRouter

from models.grade import GradeCreate
from database.connection import grades_collection


router = APIRouter(
    prefix="/grades",
    tags=["Grades"]
)


@router.get("/")
def get_grades():

    grades = list(
        grades_collection.find(
            {},
            {
                "_id": 0
            }
        )
    )

    return grades


@router.post("/")
def create_grade(grade: GradeCreate):

    grade_document = grade.model_dump()

    grade_document["status"] = (
        "Graded"
        if grade.score is not None
        else "Pending"
    )

    grades_collection.insert_one(
        grade_document
    )

    return {
        "message": "Grade saved successfully."
    }