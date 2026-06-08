import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  const loadSummary = async () => {
    try {
      const response = await api.get("/dashboard/summary");
      setSummary(response.data);
      setError("");
    } catch (err) {
      setError("Backend connection failed or login expired.");
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!summary) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">
            Welcome, {user?.fullName}. You are logged in as {user?.role}.
          </p>
        </div>

        <button onClick={loadSummary}>Refresh</button>
      </div>

      <div className="cards">
        {user?.role === "Admin" && (
          <div className="card">
            <h3>Total Users</h3>
            <p>{summary.totalUsers}</p>
          </div>
        )}

        <div className="card">
          <h3>Total Courses</h3>
          <p>{summary.totalCourses}</p>
        </div>

        <div className="card">
          <h3>Total Tasks</h3>
          <p>{summary.totalTasks}</p>
        </div>

        <div className="card">
          <h3>Completed</h3>
          <p>{summary.completedTasks}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p>{summary.pendingTasks}</p>
        </div>

        <div className="card">
          <h3>In Progress</h3>
          <p>{summary.inProgressTasks}</p>
        </div>

        <div className="card">
          <h3>High Priority</h3>
          <p>{summary.highPriorityTasks}</p>
        </div>

        <div className="card">
          <h3>Progress</h3>
          <p>{summary.progressPercentage}%</p>
        </div>
      </div>

      <div className="progress-card">
        <div className="progress-header">
          <strong>Learning Progress</strong>
          <span>{summary.progressPercentage}%</span>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${summary.progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;