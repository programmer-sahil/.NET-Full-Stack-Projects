# Student Course Management System

Student Course Management System is a production-style full-stack admin application built with ASP.NET Core Web API and React. It helps an admin manage students, courses, and student-course enrollments from a responsive dashboard.

This project is designed for a fresher .NET developer portfolio and technical interview discussion. The code is intentionally clean, layered, and easy to explain.

## Highlights

- Admin login with JWT authentication
- Password hashing using PBKDF2
- Role-based authorization for Admin-only APIs
- Student CRUD with search by name, email, or department
- Course CRUD with search by title or course code
- Enrollment management with duplicate-enrollment prevention
- Dashboard cards for total students, courses, and enrollments
- Recent enrollments list
- DTO-based API contracts
- Service layer and repository pattern
- EF Core SQLite database with migrations
- Swagger UI for API testing
- React protected routes with localStorage token handling
- Responsive Tailwind CSS dashboard layout

## Tech Stack

Backend:
- ASP.NET Core Web API
- C#
- Entity Framework Core
- SQLite
- JWT Bearer Authentication
- Role-Based Authorization
- Swagger / OpenAPI
- LINQ, DTOs, service layer, repository pattern

Frontend:
- React with Vite
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React icons
- Protected routes
- Dashboard layout

## Architecture

Backend request flow:

```text
HTTP Request
→ Controller
→ Service
→ Repository
→ EF Core DbContext
→ SQLite Database
```

Frontend request flow:

```text
React Page
→ Reusable Component
→ Axios API Service
→ ASP.NET Core API
```

## Folder Structure

```text
StudentCourseManagement/
├── StudentCourseManagement.Api/
│   ├── Controllers/
│   ├── Data/
│   ├── DTOs/
│   ├── Helpers/
│   ├── Interfaces/
│   ├── Migrations/
│   ├── Models/
│   ├── Repositories/
│   ├── Services/
│   ├── Program.cs
│   └── appsettings.json
├── StudentCourseManagement.Client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── utils/
│   ├── package.json
│   └── tailwind.config.js
├── INTERVIEW_NOTES.md
├── .gitignore
└── README.md
```

## Backend Setup

From the repository root:

```bash
cd StudentCourseManagement
dotnet restore
dotnet ef database update --project StudentCourseManagement.Api --startup-project StudentCourseManagement.Api
dotnet run --project StudentCourseManagement.Api --launch-profile http
```

Backend URLs:

```text
API:     http://localhost:5075
Swagger: http://localhost:5075/swagger
```

The API also applies migrations and seeds the default admin user on startup.

If port `5075` is busy:

```bash
ASPNETCORE_ENVIRONMENT=Development dotnet run --project StudentCourseManagement.Api --no-launch-profile --urls http://localhost:5085
```

## Frontend Setup

```bash
cd StudentCourseManagement/StudentCourseManagement.Client
npm install
cp .env.example .env
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

If the API is running on the fallback port, update `.env`:

```text
VITE_API_BASE_URL=http://localhost:5085/api
```

## Default Admin Login

```text
Email: admin@studentcms.com
Password: Admin@123
```

## Database

The app uses SQLite for easy local setup.

Generated database file:

```text
StudentCourseManagement.Api/student_course_management.db
```

The database file is ignored by Git. The schema is versioned through EF Core migrations in:

```text
StudentCourseManagement.Api/Migrations
```

Migration commands:

```bash
dotnet ef migrations add MigrationName --project StudentCourseManagement.Api --startup-project StudentCourseManagement.Api
dotnet ef database update --project StudentCourseManagement.Api --startup-project StudentCourseManagement.Api
dotnet ef migrations remove --project StudentCourseManagement.Api --startup-project StudentCourseManagement.Api
```

## API Endpoints

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/login` | No | Admin login and JWT generation |
| GET | `/api/dashboard/stats` | Admin | Dashboard totals and recent enrollments |
| GET | `/api/students?search=value` | Admin | List/search students |
| GET | `/api/students/{id}` | Admin | Get student details |
| POST | `/api/students` | Admin | Create student |
| PUT | `/api/students/{id}` | Admin | Update student |
| DELETE | `/api/students/{id}` | Admin | Delete student |
| GET | `/api/courses?search=value` | Admin | List/search courses |
| GET | `/api/courses/{id}` | Admin | Get course details |
| POST | `/api/courses` | Admin | Create course |
| PUT | `/api/courses/{id}` | Admin | Update course |
| DELETE | `/api/courses/{id}` | Admin | Delete course |
| GET | `/api/enrollments` | Admin | List enrollments |
| GET | `/api/enrollments/{id}` | Admin | Get enrollment details |
| POST | `/api/enrollments` | Admin | Assign course to student |
| PUT | `/api/enrollments/{id}` | Admin | Update enrollment |
| DELETE | `/api/enrollments/{id}` | Admin | Delete enrollment |

## Validation Rules

Backend:
- Required fields are validated with data annotations.
- Student email must be unique.
- Course code must be unique.
- Student-course enrollment must be unique.
- Protected controllers require the Admin role.

Frontend:
- Required form fields show user-friendly messages.
- API errors are displayed in reusable error components.
- Delete actions use confirmation modals.

## Verification

```bash
dotnet build StudentCourseManagement.slnx

cd StudentCourseManagement.Client
npm run lint
npm run build
npm audit --audit-level=moderate
```

## Screenshots

Add screenshots before publishing the repository:

- Login page
- Dashboard page
- Students list
- Student form
- Courses list
- Enrollments list

## Interview Preparation

See [INTERVIEW_NOTES.md](./INTERVIEW_NOTES.md) for:

- Project overview
- Backend and frontend architecture
- Database relationships
- JWT authentication flow
- Role-based authorization
- EF Core explanation
- 2-minute interview answer
- Common interview questions and answers

## Future Improvements

- Pagination and sorting
- CSV import/export
- Refresh tokens
- Email notifications
- Department-wise analytics charts
- Unit and integration tests
- Cloud deployment with a hosted database
