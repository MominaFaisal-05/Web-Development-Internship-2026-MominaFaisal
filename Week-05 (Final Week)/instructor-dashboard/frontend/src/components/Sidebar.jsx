import {
    LayoutDashboard,
    BookOpen,
    Users,
    GraduationCap,
    LogOut
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
function Sidebar() {
    const navigate = useNavigate();
    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };
    return (
    <aside className="sidebar">
        <div className="brand">
            <div className="brand-icon">
                DS
                </div>
                <div>
                    <h2>Digital Skills</h2>
                    <span>Instructor Portal</span>
                    </div>
                    </div>
        <nav className="sidebar-nav">
            <NavLink to="/dashboard">
            <LayoutDashboard size={19} />
            Dashboard
            </NavLink>
            <NavLink to="/courses">
            <BookOpen size={19} />
            Courses
            </NavLink>
            
            <NavLink to="/students">
            <Users size={19} />
            Students
            </NavLink>
            
            <NavLink to="/grades">
            <GraduationCap size={19} />
            Grades
            </NavLink>
        </nav>

        <div className="sidebar-bottom">
        <div className="sidebar-user">
            <div className="avatar">
            {user.name
                ? user.name.charAt(0).toUpperCase()
                : "I"}
            </div>
            <div>
            <strong>
                {user.name || "Instructor"}
            </strong>
            <span>
                {user.role || "Instructor"}
            </span>
            </div>
        </div>

        <button
            className="logout-button"
            onClick={handleLogout}
        >
            <LogOut size={18} />
            Logout
        </button>
        </div>
    </aside>
    );
}
export default Sidebar;