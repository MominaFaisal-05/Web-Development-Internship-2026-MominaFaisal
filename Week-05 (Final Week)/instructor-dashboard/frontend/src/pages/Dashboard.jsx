import {
    BookOpen,
    Users,
    GraduationCap,
    TrendingUp
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import CourseCard from "../components/CourseCard";
import StudentProgress from "../components/StudentProgress";

function Dashboard() {
    const courses = [
    {
        title: "Web Development",
        description:
        "HTML, CSS, JavaScript and modern frontend development.",
        students: 32,
        level: "Intermediate",
        status: "Active"
    },
    {
        title: "Python Programming",
        description:
        "Learn Python programming from fundamentals to projects.",
        students: 24,
        level: "Beginner",
        status: "Active"
    },
    {
        title: "Database Systems",
        description:
        "Learn database design, queries and data management.",
        students: 18,
        level: "Intermediate",
        status: "Active"
    }
    ];

    const students = [
    {
        name: "Ali Khan",
        email: "ali@example.com",
        progress: 85,
        grade: "A"
    },
    {
        name: "Ayesha Malik",
        email: "ayesha@example.com",
        progress: 72,
        grade: "B+"
    },
    {
        name: "Hamza Ahmed",
        email: "hamza@example.com",
        progress: 64,
        grade: "B"
    },
    {
        name: "Fatima Noor",
        email: "fatima@example.com",
        progress: 91,
        grade: "A+"
    }
    ];

    return (
    <div className="app-layout">
        <Sidebar />

        <main className="main-content">
        <Navbar
            title="Instructor Dashboard"
            subtitle="Welcome back. Here's what's happening with your courses."
        />

        <section className="page-content">
            <div className="stats-grid">
            <StatCard
                title="Total Courses"
                value="6"
                description="+2 this month"
                icon={BookOpen}
            />

            <StatCard
                title="Total Students"
                value="74"
                description="+12 this month"
                icon={Users}
            />

            <StatCard
                title="Assignments Graded"
                value="128"
                description="18 pending"
                icon={GraduationCap}
            />

            <StatCard
                title="Average Progress"
                value="78%"
                description="+6% this month"
                icon={TrendingUp}
            />
            </div>

            <div className="dashboard-grid">
            <section className="dashboard-section">
                <div className="section-heading">
                <div>
                    <h2>Your Courses</h2>
                    <p>
                    Manage your active courses
                    </p>
                </div>

                <a href="/courses">
                    View all
                </a>
                </div>

                <div className="courses-grid">
                {courses.map((course, index) => (
                    <CourseCard
                    key={index}
                    course={course}
                    />
                ))}
                </div>
            </section>

            <section className="dashboard-section">
                <div className="section-heading">
                <div>
                    <h2>Student Progress</h2>
                    <p>
                    Recent student performance
                    </p>
                </div>

                <a href="/students">
                    View all
                </a>
                </div>

                <div className="student-list">
                {students.map((student, index) => (
                    <StudentProgress
                    key={index}
                    student={student}
                    />
                ))}
                </div>
            </section>
            </div>
        </section>
        </main>
    </div>
    );
}
export default Dashboard;