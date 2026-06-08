import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const emptyForm = {
  title: "",
  description: "",
  category: "",
  durationHours: 1,
};

function Courses() {
  const { isAdmin } = useAuth();

  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadCourses = async () => {
    try {
      const response = await api.get("/courses");
      setCourses(response.data);
      setError("");
    } catch (err) {
      setError("Failed to load courses. Please login again.");
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "durationHours" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Course title is required.");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/courses/${editingId}`, form);
        setSuccess("Course updated successfully.");
      } else {
        await api.post("/courses", form);
        setSuccess("Course created successfully.");
      }

      setForm(emptyForm);
      setEditingId(null);
      setError("");
      loadCourses();
    } catch (err) {
      setError("Save failed. Only Admin can create or update courses.");
    }
  };

  const handleEdit = (course) => {
    setEditingId(course.id);
    setForm({
      title: course.title,
      description: course.description,
      category: course.category,
      durationHours: course.durationHours,
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this course? Related tasks will also be deleted."
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/courses/${id}`);
      setSuccess("Course deleted successfully.");
      loadCourses();
    } catch (err) {
      setError("Delete failed. Only Admin can delete courses.");
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setSuccess("");
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Courses</h1>
          <p className="muted">
            {isAdmin
              ? "Admin can create, update, and delete courses."
              : "Students can view available courses."}
          </p>
        </div>

        <button onClick={loadCourses}>Refresh</button>
      </div>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {isAdmin && (
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>{editingId ? "Update Course" : "Add Course"}</h2>

          <label>Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="ASP.NET Core"
          />

          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Course description"
          />

          <label>Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder=".NET / Frontend / Database"
          />

          <label>Duration Hours</label>
          <input
            type="number"
            name="durationHours"
            value={form.durationHours}
            onChange={handleChange}
            min="1"
          />

          <div className="button-row">
            <button type="submit">{editingId ? "Update" : "Create"}</button>
            {editingId && (
              <button type="button" className="secondary" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      <div className="table-card">
        <div className="page-header">
          <h2>Course List</h2>

          <input
            className="search-input"
            type="text"
            placeholder="Search course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Hours</th>
              <th>Tasks</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.title}</td>
                <td>{course.category}</td>
                <td>{course.durationHours}</td>
                <td>{course.taskCount}</td>

                {isAdmin && (
                  <td>
                    <button className="small" onClick={() => handleEdit(course)}>
                      Edit
                    </button>

                    <button
                      className="small danger"
                      onClick={() => handleDelete(course.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}

            {filteredCourses.length === 0 && (
              <tr>
                <td colSpan={isAdmin ? "6" : "5"}>No courses found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Courses;