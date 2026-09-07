import os

from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv(
    "MONGO_URL",
    "mongodb://localhost:27017"
)

client = MongoClient(MONGO_URL)

db = client["digital_skills_platform"]

users_collection = db["users"]
courses_collection = db["courses"]
progress_collection = db["progress"]
grades_collection = db["grades"]