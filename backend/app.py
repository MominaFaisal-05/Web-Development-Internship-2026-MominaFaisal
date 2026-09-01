from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta, timezone
from functools import wraps
import jwt
import os

# Configuration
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, "..", "frontend")

app = Flask(
    __name__,
    static_folder=FRONTEND_DIR,
    static_url_path=""
)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "sqlite:///" + os.path.join(BASE_DIR, "users.db")
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.environ.get(
    "SECRET_KEY",
    "change-this-secret-in-production"
)
db = SQLAlchemy(app)

# User Model
class User(db.Model):
    id = db.Column(
        db.Integer,
        primary_key=True
    )
    name = db.Column(
        db.String(100),
        nullable=False
    )
    email = db.Column(
        db.String(150),
        unique=True,
        nullable=False,
        index=True
    )
    password_hash = db.Column(
        db.String(255),
        nullable=False
    )
    role = db.Column(
        db.String(20),
        nullable=False
    )
    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

# JWT Token Creation
def create_token(user):
    payload = {
        "user_id": user.id,
        "exp": datetime.now(timezone.utc) + timedelta(hours=2)
    }
    token = jwt.encode(
        payload,
        app.config["SECRET_KEY"],
        algorithm="HS256"
    )
    return token

# Authentication Decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get(
            "Authorization",
            ""
        )
        if not auth_header.startswith("Bearer "):
            return jsonify({
                "message": "Authentication token is required."
            }), 401
        token = auth_header.split(
            " ",
            1
        )[1]
        try:
            payload = jwt.decode(
                token,
                app.config["SECRET_KEY"],
                algorithms=["HS256"]
            )
            user = db.session.get(
                User,
                payload["user_id"]
            )
            if not user:
                return jsonify({
                    "message": "User not found."
                }), 401
            request.current_user = user
        except jwt.ExpiredSignatureError:
            return jsonify({
                "message": "Session expired. Please log in again."
            }), 401

        except jwt.InvalidTokenError:

            return jsonify({
                "message": "Invalid authentication token."
            }), 401

        return f(*args, **kwargs)

    return decorated

# Serve Frontend
@app.route("/")
def home():
    return send_from_directory(
        FRONTEND_DIR,
        "index.html"
    )
@app.route("/<path:path>")
def frontend_files(path):
    return send_from_directory(
        FRONTEND_DIR,
        path
    )

# SIGNUP API
@app.post("/api/auth/signup")
def signup():
    data = request.get_json(
        silent=True
    ) or {}
    name = data.get(
        "name",
        ""
    ).strip()
    email = data.get(
        "email",
        ""
    ).strip().lower()
    password = data.get(
        "password",
        ""
    )
    role = data.get(
        "role",
        ""
    ).strip().title()

    # Required fields
    if not name or not email or not password or not role:
        return jsonify({
            "message": "All fields are required."
        }), 400

    # Email validation
    if (
        "@" not in email
        or "." not in email.split("@")[-1]
    ):
        return jsonify({
            "message": "Please enter a valid email address."
        }), 400

    # Password validation
    if len(password) < 8:
        return jsonify({
            "message": "Password must be at least 8 characters."
        }), 400

    # Role validation
    if role not in {
        "Student",
        "Instructor"
    }:
        return jsonify({
            "message": "Role must be Student or Instructor."
        }), 400

    # Duplicate email
    existing_user = User.query.filter_by(
        email=email
    ).first()

    if existing_user:
        return jsonify({
            "message": "An account with this email already exists."
        }), 409

    # Hash password
    hashed_password = generate_password_hash(
        password
    )
    user = User(
        name=name,
        email=email,
        password_hash=hashed_password,
        role=role
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "Registration successful! You can now log in."
    }), 201

# LOGIN API
@app.post("/api/auth/login")
def login():
    data = request.get_json(
        silent=True
    ) or {}
    email = data.get(
        "email",
        ""
    ).strip().lower()
    password = data.get(
        "password",
        ""
    )
    if not email or not password:
        return jsonify({
            "message": "Email and password are required."
        }), 400
    user = User.query.filter_by(
        email=email
    ).first()

    if (
        not user
        or not check_password_hash(
            user.password_hash,
            password
        )
    ):
        return jsonify({
            "message": "Invalid email or password."
        }), 401
    token = create_token(user)
    return jsonify({
        "message": "Login successful.",
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }), 200

# CURRENT USER API
@app.get("/api/auth/me")
@token_required
def me():
    user = request.current_user
    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role
        })

# LOGOUT API
@app.post("/api/auth/logout")
@token_required
def logout():
    return jsonify({
        "message": "Logout successful."
    })

# Initialize Database
with app.app_context():
    db.create_all()

# Run Application
if __name__ == "__main__":
    app.run(
        debug=True,
        port=5000
    )