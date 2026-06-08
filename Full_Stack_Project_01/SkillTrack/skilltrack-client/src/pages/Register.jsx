import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
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

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.fullName.trim() || !form.email.trim() || !form.password.trim()) {
      setError("All fields are required.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      await register(form.fullName, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Email may already exist.");
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleRegister}>
        <h1>Create Account</h1>
        <p>Register as a student and start tracking your learning.</p>

        {error && <p className="error">{error}</p>}

        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="SK Sahil"
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="student@example.com"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Minimum 6 characters"
        />

        <button type="submit">Register</button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
}

export default Register;