from fastapi import APIRouter

from models.course import CourseCreate
from database.connection import courses_collection


router = APIRouter(
    prefix="/courses",
    tags=["Courses"]
)


@router.get("/")
def get_courses():

    courses = list(
        courses_collection.find(
            {},
            {
                "_id": 0
            }
        )
    )

    return courses


@router.post("/")
def create_course(course: CourseCreate):

    course_document = course.model_dump()

    course_document["status"] = "Active"
    course_document["students"] = 0

    courses_collection.insert_one(
        course_document
    )

    return {
        "message": "Course created successfully."
    }