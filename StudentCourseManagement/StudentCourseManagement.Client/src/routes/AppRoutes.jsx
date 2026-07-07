import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import AddEnrollmentPage from '../pages/AddEnrollmentPage'
import CourseDetailsPage from '../pages/CourseDetailsPage'
import CourseFormPage from '../pages/CourseFormPage'
import CoursesPage from '../pages/CoursesPage'
import DashboardPage from '../pages/DashboardPage'
import EnrollmentsPage from '../pages/EnrollmentsPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import StudentDetailsPage from '../pages/StudentDetailsPage'
import StudentFormPage from '../pages/StudentFormPage'
import StudentsPage from '../pages/StudentsPage'
import ProtectedRoute from './ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="students/add" element={<StudentFormPage />} />
          <Route path="students/:id" element={<StudentDetailsPage />} />
          <Route path="students/:id/edit" element={<StudentFormPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/add" element={<CourseFormPage />} />
          <Route path="courses/:id" element={<CourseDetailsPage />} />
          <Route path="courses/:id/edit" element={<CourseFormPage />} />
          <Route path="enrollments" element={<EnrollmentsPage />} />
          <Route path="enrollments/add" element={<AddEnrollmentPage />} />
        </Route>
      </Route>

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}
