import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const emptyForm = {
  title: "",
  description: "",
  status: "Pending",
  priority: "Medium",
  dueDate: "",
  courseId: "",
};

function toDateInput(value) {
  if (!value) return "";
  return value.substring(0, 10);
}

function getStatusClass(status) {
  if (status === "Completed") return "status completed";
  if (status === "In Progress") return "status progress";
  return "status pending";
}

function getPriorityClass(priority) {
  if (priority === "High") return "priority high";
  if (priority === "Low") return "priority low";
  return "priority medium";
}

function Tasks() {
  const { user, isAdmin } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadCourses = async () => {
    try {
      const response = await api.get("/courses");
      setCourses(response.data);
    } catch (err) {
      setError("Failed to load courses.");
    }
  };

  const loadTasks = async () => {
    try {
      const params = {};

      if (filterStatus) params.status = filterStatus;
      if (filterPriority) params.priority = filterPriority;

      const response = await api.get("/tasks", { params });
      setTasks(response.data);
      setError("");
    } catch (err) {
      setError("Failed to load tasks. Please login again.");
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    loadTasks();
  }, [filterStatus, filterPriority]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Task title is required.");
      return;
    }

    if (!form.courseId) {
      setError("Please select a course.");
      return;
    }

    const payload = {
      title: form.title,
      description: form.description,
      status: form.status,
      priority: form.priority,
      dueDate: form.dueDate ? form.dueDate : null,
      courseId: Number(form.courseId),
    };

    try {
      if (editingId) {
        await api.put(`/tasks/${editingId}`, payload);
        setSuccess("Task updated successfully.");
      } else {
        await api.post("/tasks", payload);
        setSuccess("Task created successfully.");
      }

      setForm(emptyForm);
      setEditingId(null);
      setError("");
      loadTasks();
    } catch (err) {
      setError("Save failed. Check your task input.");
    }
  };

  const handleEdit = (task) => {
    setEditingId(task.id);

    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: toDateInput(task.dueDate),
      courseId: String(task.courseId),
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this task?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/tasks/${id}`);
      setSuccess("Task deleted successfully.");
      loadTasks();
    } catch (err) {
      setError("Delete failed.");
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setSuccess("");
  };

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Tasks</h1>
          <p className="muted">
            {isAdmin
              ? "Admin can view all users' tasks."
              : `${user?.fullName}, you can manage your own tasks.`}
          </p>
        </div>

        <button onClick={loadTasks}>Refresh</button>
      </div>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form className="form-card" onSubmit={handleSubmit}>
        <h2>{editingId ? "Update Task" : "Add Task"}</h2>

        <label>Task Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Practice ASP.NET Core CRUD"
        />

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Task details"
        />

        <label>Course</label>
        <select name="courseId" value={form.courseId} onChange={handleChange}>
          <option value="">Select Course</option>

          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>

        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <label>Priority</label>
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
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

      <div className="table-card">
        <div className="page-header">
          <h2>Task List</h2>

          <div className="filters">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="">All Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Course</th>
              {isAdmin && <th>User</th>}
              <th>Status</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.courseTitle}</td>

                {isAdmin && <td>{task.userFullName}</td>}

                <td>
                  <span className={getStatusClass(task.status)}>
                    {task.status}
                  </span>
                </td>

                <td>
                  <span className={getPriorityClass(task.priority)}>
                    {task.priority}
                  </span>
                </td>

                <td>{task.dueDate ? task.dueDate.substring(0, 10) : "No date"}</td>

                <td>
                  <button className="small" onClick={() => handleEdit(task)}>
                    Edit
                  </button>

                  <button
                    className="small danger"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {tasks.length === 0 && (
              <tr>
                <td colSpan={isAdmin ? "8" : "7"}>No tasks found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Tasks;