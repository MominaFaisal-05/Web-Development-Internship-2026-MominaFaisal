function StudentProgress({ student }) {
    return (
    <div className="student-progress">
        <div className="student-info">
        <div className="avatar">
            {student.name
            ? student.name.charAt(0).toUpperCase()
            : "S"}
        </div>

        <div>
            <strong>{student.name}</strong>

            <span>{student.email}</span>
        </div>
        </div>

        <div className="progress-area">
        <div className="progress-label">
            <span>Progress</span>

            <strong>
            {student.progress}%
            </strong>
        </div>

        <div className="progress-bar">
            <div
            style={{
                width: `${student.progress}%`
            }}
            />
        </div>
        </div>

        <span className="grade-badge">
        {student.grade || "N/A"}
        </span>
    </div>
    );
}
export default StudentProgress;