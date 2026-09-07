from fastapi import APIRouter

from database.connection import (
    users_collection,
    progress_collection
)


router = APIRouter(
    prefix="/students",
    tags=["Students"]
)


@router.get("/")
def get_students():

    students = list(
        users_collection.find(
            {
                "role": "student"
            },
            {
                "_id": 0,
                "password": 0
            }
        )
    )

    for student in students:

        progress_data = list(
            progress_collection.find({
                "student_email":
                    student["email"]
            })
        )

        if progress_data:
            average = sum(
                item.get("progress", 0)
                for item in progress_data
            ) / len(progress_data)
        else:
            average = 0

        student["progress"] = round(
            average
        )

    return students