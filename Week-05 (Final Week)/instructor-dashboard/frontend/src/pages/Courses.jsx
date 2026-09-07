import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";

function Courses() {
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
        "Learn database design, SQL and database management.",
        students: 18,
        level: "Intermediate",
        status: "Active"
    },
    {
        title: "Data Structures",
        description:
        "Understand arrays, linked lists, trees and algorithms.",
        students: 21,
        level: "Advanced",
        status: "Active"
    }
    ];

    return (
    <div className="app-layout">
        <Sidebar />

        <main className="main-content">
        <Navbar
            title="Courses"
            subtitle="Manage your courses and learning content."
        />

        <section className="page-content">
            <div className="page-header">
            <div>
                <h2>My Courses</h2>

                <p>
                Create, update and manage your course content.
                </p>
            </div>

            <button className="primary-button">
                + Create Course
            </button>
            </div>

            <div className="courses-grid large">
            {courses.map((course, index) => (
                <CourseCard
                key={index}
                course={course}
                />
            ))}
            </div>
        </section>
        </main>
    </div>
    );
}
export default Courses;