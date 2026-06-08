import { Link } from "react-router-dom";

function Landing() {
  return (
    <section className="landing">
      <div className="landing-content">
        <p className="badge">Full-Stack Learning Management System</p>

        <h1>SkillTrack Pro</h1>

        <p className="landing-text">
          Manage courses, track learning tasks, monitor progress, and organize
          student learning through a secure full-stack dashboard.
        </p>

        <div className="landing-actions">
          <Link to="/login" className="btn-link">
            Login
          </Link>

          <Link to="/register" className="btn-link secondary-link">
            Register
          </Link>
        </div>

        <div className="demo-box">
          <h3>Demo Accounts</h3>
          <p>
            <strong>Admin:</strong> admin@skilltrack.com / Admin@123
          </p>
          <p>
            <strong>Student:</strong> student@skilltrack.com / Student@123
          </p>
        </div>
      </div>
    </section>
  );
}

export default Landing;