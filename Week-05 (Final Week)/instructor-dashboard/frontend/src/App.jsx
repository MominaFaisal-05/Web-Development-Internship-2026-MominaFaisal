import { useState } from "react";
import {
    Navigate,
    Route,
    Routes,
    useNavigate
} from "react-router-dom";

import axios from "axios";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Students from "./pages/Students";
import Grades from "./pages/Grades";

const API_URL = "http://127.0.0.1:8000";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password
            });
            
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );
            
            navigate("/dashboard");
        } catch (err) {
            setError(
                err.response?.data?.detail ||
                "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };
    
    return (
    <div className="login-page">
        <div className="login-card">
            <div className="login-logo">
                DS
                </div>
                <h1>Digital Skills</h1>
                <p className="login-subtitle">
                    Instructor Portal
                    </p>
                <form onSubmit={handleLogin}>
                    <label>Email</label>

        <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) =>
            setEmail(event.target.value)
            }
            required
        />
        <label>Password</label>
        <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) =>
            setPassword(event.target.value)
            }
            required
        />

        {error && (
            <div className="error-message">
            {error}
            </div>
        )}
        <button
            type="submit"
            className="login-button"
            disabled={loading}
        >
            {loading ? "Signing in..." : "Sign In"}
        </button>
        </form>

        <div className="demo-login">
        <strong>Demo Account</strong>
        <span>sarah@example.com</span>
        <span>Password: 123456</span>
        </div>
    </div>
    </div>
);
}

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
}

function App() {
    return (
    <Routes>
        <Route path="/" element={<Login />} />

        <Route
        path="/dashboard"
        element={
            <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>
        }
        />

        <Route
        path="/courses"
        element={
            <ProtectedRoute>
            <Courses />
            </ProtectedRoute>
        }
        />

        <Route
        path="/students"
        element={
            <ProtectedRoute>
            <Students />
            </ProtectedRoute>
        }
        />

        <Route
        path="/grades"
        element={
            <ProtectedRoute>
            <Grades />
            </ProtectedRoute>
        }
        />

        <Route
        path="*"
        element={<Navigate to="/" replace />}
        />
    </Routes>
    );
}
export default App;