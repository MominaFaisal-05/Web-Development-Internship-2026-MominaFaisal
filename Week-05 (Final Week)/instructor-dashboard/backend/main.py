from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.auth import router as auth_router
from routes.dashboard import router as dashboard_router
from routes.courses import router as courses_router
from routes.students import router as students_router
from routes.grades import router as grades_router


app = FastAPI(
    title="Digital Skills Platform API",
    description="Backend API for the Instructor Dashboard",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)


app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(courses_router)
app.include_router(students_router)
app.include_router(grades_router)


@app.get("/")
def root():

    return {
        "message":
        "Digital Skills Platform API is running."
    }