# SkillForge – Digital Skills Platform Authentication Module

A full-stack authentication module developed for the Digital Skills Platform internship task.

---

## Project Description

SkillForge is a Digital Skills Platform authentication system that allows users to register and log in securely.

The application supports two user roles:

- Student
- Instructor

After successful authentication, users are redirected to a protected dashboard where their name, email, and role are displayed.

---

## Features

- User registration
- User login
- Password validation
- Password hashing
- Student role
- Instructor role
- JWT authentication
- Protected dashboard
- Logout functionality
- REST API
- SQLite database
- Responsive design
- Client-side validation
- Server-side validation
- Duplicate email detection
- Invalid login handling
- Expired token handling

---

## Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Python
- Flask

### Database

- SQLite
- SQLAlchemy

### Authentication

- JWT
- Werkzeug password hashing

### API

- REST API

### Version Control

- Git
- GitHub

---

## Project Structure

digital-skills-platform/

    backend/

        app.py

        requirements.txt

        .env.example

    frontend/

        index.html

        dashboard.html

        css/

            style.css

        js/

            auth.js

            dashboard.js

    .gitignore

    README.md

---

# Installation

## Step 1 – Open the project

Open the project in Visual Studio Code.

---

## Step 2 – Create a virtual environment

Windows:

    python -m venv venv

Activate it:

    venv\Scripts\activate

---

## Step 3 – Install dependencies

Move into the backend folder:

    cd backend

Install the required packages:

    pip install -r requirements.txt

---

# Running the Application

Start the Flask server:

    python app.py

The application will run at:

    http://127.0.0.1:5000

Open this address in your browser.

---

# Database Setup

The application uses SQLite.

The database file is automatically created:

    backend/users.db

No manual database configuration is required.

---

# Authentication Flow

## Registration

1. User enters name.
2. User enters email.
3. User creates a password.
4. User selects Student or Instructor.
5. JavaScript validates the input.
6. Data is sent to the Flask REST API.
7. Flask validates the information again.
8. The password is hashed.
9. User information is stored in SQLite.

---

## Login

1. User enters email and password.
2. JavaScript sends the credentials to Flask.
3. Flask finds the user.
4. Flask compares the password with the stored hash.
5. If valid, Flask creates a JWT token.
6. The frontend stores the token.
7. User is redirected to the dashboard.

---

## Protected Dashboard

The dashboard requires an authentication token.

The frontend sends:

    Authorization: Bearer TOKEN

The Flask backend verifies the JWT.

If the token is valid, user information is returned.

If the token is missing, invalid, or expired, the user is redirected to the login page.

---

# REST API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register user |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Get current user |
| POST | /api/auth/logout | Logout |

---

# Password Security

Passwords are never stored directly in the database.

Instead, Werkzeug creates a password hash.

Example:

    password
        ↓
    generate_password_hash()
        ↓
    password_hash
        ↓
    SQLite

During login:

    entered password
        ↓
    check_password_hash()
        ↓
    authenticated / rejected

---

# User Roles

The system supports:

## Student

Students can create accounts and access the dashboard.

## Instructor

Instructors can create accounts and access the dashboard.

---

# Validation

The application validates:

- Required fields
- Email format
- Password length
- Password letter requirement
- Password number requirement
- Valid role
- Duplicate email
- Incorrect login credentials
- Missing token
- Invalid token
- Expired token

---

# Screenshots

The following screenshots should be included in the final internship submission:

1. Signup page
2. Login page
3. Successful registration
4. Successful login
5. Dashboard
6. Logout
7. Validation/error message

Recommended names:

    01-signup.png
    02-login.png
    03-registration-success.png
    04-login-success.png
    05-dashboard.png
    06-logout.png
    07-validation-error.png

---

# Short Documentation

## What I Built

I developed a responsive Digital Skills Platform authentication module using HTML, CSS, JavaScript, Flask, REST APIs, JWT authentication, and SQLite.

The system allows users to register and log in as either a Student or Instructor and provides a protected dashboard displaying their account information.

---

## How Authentication Works

During registration, the password is securely hashed before being stored in the SQLite database.

During login, the entered password is compared against the stored password hash.

After successful authentication, the Flask backend generates a JWT token.

The frontend stores the token and uses it when requesting protected API resources.

---

## Technologies Used

The frontend was developed using HTML5, CSS3, and Vanilla JavaScript.

Flask was used for the backend and REST API.

SQLite was used as the database.

SQLAlchemy handles database operations.

PyJWT handles authentication tokens.

Werkzeug handles password hashing.

---

## Database Used

SQLite was selected because it is lightweight, easy to configure, and suitable for a small authentication project.

The database is automatically created by Flask.

---

## Challenges Faced

The main challenges were:

- Connecting frontend forms with the backend API
- Securely storing passwords
- Protecting the dashboard
- Managing authentication tokens
- Validating user input

---

## Solutions

JavaScript fetch requests were used to communicate with the Flask REST API.

Werkzeug was used for password hashing.

JWT was implemented for authentication.

The authentication token is stored in localStorage.

The dashboard checks the authentication token before displaying protected content.

---

# GitHub

Initialize Git:

    git init

Add files:

    git add .

Commit:

    git commit -m "Build authentication module"

Set branch:

    git branch -M main

Connect GitHub:

    git remote add origin https://github.com/YOUR-USERNAME/digital-skills-platform.git

Push:

    git push -u origin main

---

# Future Improvements

Possible future improvements include:

- Admin dashboard
- Forgot password
- Email verification
- Course management
- Student progress tracking
- Instructor course creation
- Refresh tokens
- PostgreSQL production database
- HTTP-only cookies
- Rate limiting
- Two-factor authentication