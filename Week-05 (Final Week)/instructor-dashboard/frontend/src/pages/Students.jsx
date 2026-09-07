import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Students() {
    const students = [
    {
        name: "Ali Khan",
        email: "ali@example.com",
        course: "Web Development",
        progress: 85,
        grade: "A"
    },
    {
        name: "Ayesha Malik",
        email: "ayesha@example.com",
        course: "Python Programming",
        progress: 72,
        grade: "B+"
    },
    {
        name: "Hamza Ahmed",
        email: "hamza@example.com",
        course: "Database Systems",
        progress: 64,
        grade: "B"
    },
    {
        name: "Fatima Noor",
        email: "fatima@example.com",
        course: "Web Development",
        progress: 91,
        grade: "A+"
    },
    {
        name: "Usman Tariq",
        email: "usman@example.com",
        course: "Data Structures",
        progress: 58,
        grade: "C+"
    }
    ];

    return (
    <div className="app-layout">
        <Sidebar />

        <main className="main-content">
        <Navbar
            title="Students"
            subtitle="Monitor student progress and performance."
        />

        <section className="page-content">
            <div className="page-header">
            <div>
                <h2>Student Overview</h2>

                <p>
                Track enrollment, progress and grades.
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
                    <th>Progress</th>
                    <th>Grade</th>
                    <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {students.map((student, index) => (
                    <tr key={index}>
                        <td>
                        <div className="table-user">
                            <div className="avatar">
                            {student.name.charAt(0)}
                            </div>

                            <div>
                            <strong>
                                {student.name}
                            </strong>

                            <span>
                                {student.email}
                            </span>
                            </div>
                        </div>
                        </td>

                        <td>{student.course}</td>

                        <td>
                        <div className="table-progress">
                            <div className="progress-bar">
                            <div
                                style={{
                                width: `${student.progress}%`
                                }}
                            />
                            </div>

                            <span>
                            {student.progress}%
                            </span>
                        </div>
                        </td>

                        <td>
                        <span className="grade-badge">
                            {student.grade}
                        </span>
                        </td>

                        <td>
                        <span className="status-badge">
                            Active
                        </span>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </section>
        </main>
    </div>
    );
}
export default Students;