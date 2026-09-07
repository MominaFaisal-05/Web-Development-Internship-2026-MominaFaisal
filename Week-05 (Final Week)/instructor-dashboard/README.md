# Digital Skills Platform – Instructor Dashboard

## Project Overview

The Digital Skills Platform Instructor Dashboard is a full-stack web application designed to help instructors manage courses, monitor student progress, and manage student grades.

The project was developed as an individual Week contribution for the NitroXhift Studios internship program.

## Features

* Instructor login
* JWT-based authentication
* Instructor dashboard
* Course management
* Student progress monitoring
* Student overview
* Assignment and grade management
* Responsive design
* REST API
* MongoDB database
* Protected dashboard routes
* Logout functionality

## Technologies Used

### Frontend

* React.js
* Vite
* JavaScript
* HTML
* CSS
* Axios
* React Router
* Lucide React

### Backend

* Python
* FastAPI
* REST API
* JWT Authentication
* Passlib

### Database

* MongoDB

### Development Tools

* Visual Studio Code
* Git
* GitHub
* MongoDB Compass

## Project Structure

```text
digital-skills-platform/
│
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── CourseCard.jsx
│   │   │   └── StudentProgress.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── Students.jsx
│   │   │   └── Grades.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── backend/
│   ├── database/
│   │   └── connection.py
│   │
│   ├── models/
│   │   ├── user.py
│   │   ├── course.py
│   │   ├── progress.py
│   │   └── grade.py
│   │
│   ├── routes/
│   │   ├── auth.py
│   │   ├── dashboard.py
│   │   ├── courses.py
│   │   ├── students.py
│   │   └── grades.py
│   │
│   ├── main.py
│   ├── seed.py
│   └── requirements.txt
│
├── screenshots/
│
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project

```bash
cd digital-skills-platform
```

## Backend Setup

Open a terminal and move into the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Make sure MongoDB is installed and running.

Seed the database:

```bash
python seed.py
```

Start FastAPI:

```bash
uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

FastAPI documentation is available at:

```text
http://127.0.0.1:8000/docs
```

## Frontend Setup

Open another terminal.

Move into the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

## Demo Login

Use the following instructor account:

```text
Email: sarah@example.com
Password: 123456
```

## API Endpoints

### Authentication

```text
POST /auth/register
POST /auth/login
```

### Dashboard

```text
GET /dashboard/stats
```

### Courses

```text
GET /courses/
POST /courses/
```

### Students

```text
GET /students/
```

### Grades

```text
GET /grades/
POST /grades/
```

## Database Collections

The MongoDB database is:

```text
digital_skills_platform
```

Collections:

```text
users
courses
progress
grades
```

## Security

The application uses JWT tokens for authentication.

Passwords are hashed before being stored in the database.

The frontend stores the authentication token in local storage and prevents access to dashboard routes when the user is not authenticated.

## Responsive Design

The dashboard is designed to work on:

* Desktop
* Laptop
* Tablet
* Mobile devices

## Challenges

During development, some of the main challenges included:

* Connecting React with FastAPI
* Designing REST API endpoints
* Connecting FastAPI with MongoDB
* Implementing authentication
* Protecting dashboard routes
* Designing a responsive instructor dashboard
* Managing student progress and grades

## Future Improvements

Possible future improvements include:

* Real-time notifications
* Course creation forms
* Assignment upload
* Instructor profile management
* Student detail pages
* Advanced analytics
* Charts and performance reports
* Role-based access control
* PostgreSQL support
* Deployment to a cloud platform

## Author

Developed as an internship project for the Digital Skills Platform.

Track: Web Development

Organization: NitroXhift Studios
