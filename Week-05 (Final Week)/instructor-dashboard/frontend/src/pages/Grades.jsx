import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Grades() {
    const assignments = [
    {
        student: "Ali Khan",
        course: "Web Development",
        assignment: "Portfolio Website",
        score: 92,
        status: "Graded"
    },
    {
        student: "Ayesha Malik",
        course: "Python Programming",
        assignment: "Python Calculator",
        score: 86,
        status: "Graded"
    },
    {
        student: "Hamza Ahmed",
        course: "Database Systems",
        assignment: "MongoDB Project",
        score: 78,
        status: "Graded"
    },
    {
        student: "Fatima Noor",
        course: "Web Development",
        assignment: "Responsive Website",
        score: 95,
        status: "Graded"
    },
    {
        student: "Usman Tariq",
        course: "Data Structures",
        assignment: "Binary Tree",
        score: null,
        status: "Pending"
    }
    ];

    return (
    <div className="app-layout">
        <Sidebar />

        <main className="main-content">
        <Navbar
            title="Grades"
            subtitle="Review and manage student assignments."
        />

        <section className="page-content">
            <div className="page-header">
            <div>
                <h2>Assignments</h2>

                <p>
                Grade assignments and provide feedback.
                </p>
            </div>
            </div>

            <div className="table-card">
            <div className="table-responsive">
                <table>
                <thead>
                    <tr>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Assignment</th>
                    <th>Score</th>
                    <th>Status</th>
                    <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {assignments.map(
                    (assignment, index) => (
                        <tr key={index}>
                        <td>
                            <strong>
                            {assignment.student}
                            </strong>
                        </td>

                        <td>
                            {assignment.course}
                        </td>

                        <td>
                            {assignment.assignment}
                        </td>

                        <td>
                            {assignment.score !== null
                            ? `${assignment.score}%`
                            : "—"}
                        </td>

                        <td>
                            <span
                            className={
                                assignment.status ===
                                "Graded"
                                ? "status-badge"
                                : "pending-badge"
                            }
                            >
                            {assignment.status}
                            </span>
                        </td>

                        <td>
                            <button className="small-button">
                            {assignment.status ===
                            "Pending"
                                ? "Grade"
                                : "Review"}
                            </button>
                        </td>
                        </tr>
                    )
                    )}
                </tbody>
                </table>
            </div>
            </div>
        </section>
        </main>
    </div>
    );
}
export default Grades;