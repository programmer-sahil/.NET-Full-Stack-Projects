import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "admin@skilltrack.com",
    password: "Admin@123",
  });

  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h1>Login</h1>
        <p>Access your SkillTrack Pro dashboard.</p>

        {error && <p className="error">{error}</p>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="admin@skilltrack.com"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Admin@123"
        />

        <button type="submit">Login</button>

        <p className="auth-switch">
          New student? <Link to="/register">Create account</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;