from fastapi import APIRouter

from database.connection import (
    courses_collection,
    users_collection,
    progress_collection,
    grades_collection
)


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def dashboard_stats():

    total_courses = courses_collection.count_documents({})

    total_students = users_collection.count_documents({
        "role": "student"
    })

    total_graded = grades_collection.count_documents({
        "score": {
            "$ne": None
        }
    })

    progress_documents = list(
        progress_collection.find({})
    )

    if progress_documents:
        average_progress = sum(
            item.get("progress", 0)
            for item in progress_documents
        ) / len(progress_documents)
    else:
        average_progress = 0

    return {
        "total_courses": total_courses,
        "total_students": total_students,
        "assignments_graded": total_graded,
        "average_progress": round(
            average_progress
        )
    }