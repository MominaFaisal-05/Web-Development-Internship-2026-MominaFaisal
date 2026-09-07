from passlib.context import CryptContext

from database.connection import (
    users_collection,
    courses_collection,
    progress_collection,
    grades_collection
)


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# =========================
# USERS
# =========================

users_collection.delete_many({})

users = [
    {
        "name": "Sarah Ahmed",
        "email": "sarah@example.com",
        "password": pwd_context.hash("123456"),
        "role": "instructor"
    },
    {
        "name": "Ali Khan",
        "email": "ali@example.com",
        "password": pwd_context.hash("123456"),
        "role": "student"
    },
    {
        "name": "Ayesha Malik",
        "email": "ayesha@example.com",
        "password": pwd_context.hash("123456"),
        "role": "student"
    },
    {
        "name": "Hamza Ahmed",
        "email": "hamza@example.com",
        "password": pwd_context.hash("123456"),
        "role": "student"
    },
    {
        "name": "Fatima Noor",
        "email": "fatima@example.com",
        "password": pwd_context.hash("123456"),
        "role": "student"
    },
    {
        "name": "Usman Tariq",
        "email": "usman@example.com",
        "password": pwd_context.hash("123456"),
        "role": "student"
    }
]

users_collection.insert_many(users)


# =========================
# COURSES
# =========================

courses_collection.delete_many({})

courses = [
    {
        "title": "Web Development",
        "description":
            "HTML, CSS, JavaScript and modern frontend development.",
        "level": "Intermediate",
        "instructor_email": "sarah@example.com",
        "students": 32,
        "status": "Active"
    },
    {
        "title": "Python Programming",
        "description":
            "Learn Python programming from fundamentals to projects.",
        "level": "Beginner",
        "instructor_email": "sarah@example.com",
        "students": 24,
        "status": "Active"
    },
    {
        "title": "Database Systems",
        "description":
            "Learn database design and database management.",
        "level": "Intermediate",
        "instructor_email": "sarah@example.com",
        "students": 18,
        "status": "Active"
    }
]

courses_collection.insert_many(courses)


# =========================
# PROGRESS
# =========================

progress_collection.delete_many({})

progress = [
    {
        "student_email": "ali@example.com",
        "course_title": "Web Development",
        "progress": 85
    },
    {
        "student_email": "ayesha@example.com",
        "course_title": "Python Programming",
        "progress": 72
    },
    {
        "student_email": "hamza@example.com",
        "course_title": "Database Systems",
        "progress": 64
    },
    {
        "student_email": "fatima@example.com",
        "course_title": "Web Development",
        "progress": 91
    },
    {
        "student_email": "usman@example.com",
        "course_title": "Database Systems",
        "progress": 58
    }
]

progress_collection.insert_many(progress)


# =========================
# GRADES
# =========================

grades_collection.delete_many({})

grades = [
    {
        "student_email": "ali@example.com",
        "course_title": "Web Development",
        "assignment": "Portfolio Website",
        "score": 92,
        "status": "Graded"
    },
    {
        "student_email": "ayesha@example.com",
        "course_title": "Python Programming",
        "assignment": "Python Calculator",
        "score": 86,
        "status": "Graded"
    },
    {
        "student_email": "hamza@example.com",
        "course_title": "Database Systems",
        "assignment": "MongoDB Project",
        "score": 78,
        "status": "Graded"
    },
    {
        "student_email": "fatima@example.com",
        "course_title": "Web Development",
        "assignment": "Responsive Website",
        "score": 95,
        "status": "Graded"
    },
    {
        "student_email": "usman@example.com",
        "course_title": "Data Structures",
        "assignment": "Binary Tree",
        "score": None,
        "status": "Pending"
    }
]

grades_collection.insert_many(grades)


print("Database seeded successfully!")