import {
    Bell,
    Search
} from "lucide-react";
function Navbar({ title, subtitle }) {
    const user = JSON.parse(
    localStorage.getItem("user") || "{}"
    );
    return (
    <header className="navbar">
        <div>
        <h1>{title}</h1>

        <p>{subtitle}</p>
        </div>
        <div className="navbar-actions">
        <div className="search-box">
            <Search size={18} />

            <input
            type="text"
            placeholder="Search..."
            />
        </div>

        <button className="icon-button">
            <Bell size={20} />
        </button>

        <div className="navbar-profile">
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
        </div>
    </header>
    );
}
export default Navbar;