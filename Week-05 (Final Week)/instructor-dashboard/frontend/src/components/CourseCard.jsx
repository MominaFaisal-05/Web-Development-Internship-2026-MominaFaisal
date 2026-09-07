import {
    BookOpen,
    Users,
    ArrowRight
} from "lucide-react";

function CourseCard({ course }) {
    return (
    <div className="course-card">
        <div className="course-card-header">
        <div className="course-icon">
            <BookOpen size={22} />
        </div>

        <span className="course-status">
            {course.status || "Active"}
        </span>
        </div>

        <h3>{course.title}</h3>

        <p>{course.description}</p>

        <div className="course-meta">
        <span>
            <Users size={16} />
            {course.students || 0} Students
        </span>

        <span>
            {course.level || "Intermediate"}
        </span>
        </div>

        <button className="course-button">
        Manage Course
        <ArrowRight size={17} />
        </button>
    </div>
    );
}
export default CourseCard;