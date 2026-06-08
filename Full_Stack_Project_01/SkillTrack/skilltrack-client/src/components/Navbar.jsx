import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        SkillTrack Pro
      </Link>

      {isAuthenticated ? (
        <div className="nav-right">
          <div className="nav-links">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/courses">Courses</NavLink>
            <NavLink to="/tasks">Tasks</NavLink>
          </div>

          <div className="user-pill">
            {user?.fullName} ({user?.role})
          </div>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="nav-links">
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;