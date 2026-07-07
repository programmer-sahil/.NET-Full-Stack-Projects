# Interview Notes: Student Course Management System

## Project Overview

Student Course Management System is a full-stack admin web application built with ASP.NET Core Web API and React. It allows an admin user to log in, manage students, manage courses, and assign courses to students through enrollment records.

## Why I Built This Project

I built this project to demonstrate practical full-stack .NET skills that are common in entry-level developer roles: REST APIs, authentication, authorization, EF Core, database relationships, DTOs, service layers, React routing, protected frontend pages, API integration, validation, and clean UI development.

## Backend Architecture

The backend is divided into clear folders:
- `Controllers` expose REST endpoints.
- `Services` contain business rules like duplicate checks and validation flow.
- `Repositories` isolate EF Core database queries.
- `Interfaces` support dependency injection and make the code easier to test.
- `DTOs` define request and response shapes.
- `Models` define database entities.
- `Data` contains `ApplicationDbContext`, migrations, and seed logic.
- `Helpers` contains JWT/password/error-handling helpers.

## Frontend Architecture

The frontend uses React with Vite. It has:
- `api` for Axios configuration and API functions.
- `context` for authentication state.
- `routes` for protected routing.
- `components` for reusable UI elements.
- `pages` for login, dashboard, student, course, and enrollment screens.
- `utils` for date formatting and API error parsing.

## Database Relationships

The system has four main tables:
- `Users`: stores admin login information.
- `Students`: stores student details.
- `Courses`: stores course details.
- `Enrollments`: join table between students and courses.

A student can enroll in many courses. A course can have many students. The `Enrollments` table connects them with `StudentId` and `CourseId`. A unique index prevents the same student from being enrolled in the same course twice.

## JWT Authentication Flow

1. Admin sends email and password to `POST /api/auth/login`.
2. Backend finds the user by email.
3. Password is verified against the stored hashed password.
4. Backend creates a JWT token with email, user id, and role claims.
5. Frontend stores the token in `localStorage`.
6. Axios adds `Authorization: Bearer <token>` to protected API requests.
7. ASP.NET Core validates the token and checks the Admin role.

## Role-Based Authorization

Controllers such as `StudentsController`, `CoursesController`, `EnrollmentsController`, and `DashboardController` use `[Authorize(Roles = "Admin")]`. This means only authenticated users with the Admin role claim can access these endpoints.

## EF Core Usage

EF Core is used for:
- Entity models and `DbSet` tables
- Fluent API relationships
- Unique indexes for email, course code, and duplicate enrollment prevention
- LINQ queries for search and dashboard statistics
- Migrations for database schema versioning
- SQLite local database setup

## Challenges Faced

- Designing the enrollment relationship correctly as a join table.
- Preventing duplicate student emails, course codes, and enrollment records.
- Keeping the backend layered but still easy for a fresher to explain.
- Handling JWT storage and automatic authorization headers on the frontend.
- Showing clean loading, error, empty, and delete-confirmation states.

## 2-Minute Interview Explanation

This is a Student Course Management System built using ASP.NET Core Web API and React. The admin logs in with JWT authentication, and protected routes allow only Admin users to manage students, courses, and enrollments. On the backend, I used EF Core with SQLite, models for User, Student, Course, and Enrollment, DTOs for clean API contracts, repositories for data access, and services for business logic like duplicate checks. The Enrollment table is a join table between Student and Course, with a unique constraint to prevent duplicate enrollment. On the frontend, I used React Router for navigation, protected routes for authentication, Axios interceptors to attach JWT tokens, and Tailwind CSS for a responsive dashboard UI. This project demonstrates CRUD operations, authentication, authorization, database relationships, API integration, validation, and clean full-stack architecture.

## Common Interview Questions and Answers

### 1. What is the purpose of DTOs in this project?

DTOs separate API request/response shapes from database models. They prevent exposing internal fields like password hashes and make validation clearer.

### 2. How is duplicate enrollment prevented?

The service checks whether the selected `StudentId` and `CourseId` already exist before creating an enrollment. The database also has a unique index on `StudentId` and `CourseId`.

### 3. Why did you use a service layer?

The service layer keeps business logic out of controllers. Controllers stay focused on HTTP requests and responses, while services handle validation, duplicate checks, and mapping.

### 4. Why did you use repositories?

Repositories keep database access code separate from business logic. This makes queries reusable and the service layer easier to read and test.

### 5. How does the frontend know the user is logged in?

After login, the JWT token and basic user details are stored in `localStorage`. Protected routes check this auth state before allowing access to dashboard pages.

### 6. How is the JWT token sent to the backend?

The Axios instance has a request interceptor that reads the token from `localStorage` and adds it to the `Authorization` header as a Bearer token.

### 7. What happens if validation fails?

Frontend validation shows user-friendly messages before submitting. Backend validation uses data annotations and service checks, returning proper 400 responses for invalid data.

### 8. What are the main HTTP status codes used?

The API returns 200 for successful reads/updates, 201 for creates, 204 for deletes, 400 for invalid requests, 401 for unauthorized login/access, 404 for missing records, and 500 for unexpected errors.

### 9. Why SQLite instead of SQL Server?

SQLite makes the project easier to run locally without installing a database server. EF Core can be switched to SQL Server later with provider and connection string changes.

### 10. What would you improve next?

I would add pagination, sorting, automated tests, refresh tokens, CSV import, and deployment setup.
