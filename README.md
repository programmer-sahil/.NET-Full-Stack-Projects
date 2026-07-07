# .NET Full-Stack Portfolio Projects

Professional full-stack .NET projects built for fresher-level portfolio, resume, and interview preparation. The repository currently contains two complete applications with ASP.NET Core Web API backends and React + Vite frontends.

## Projects

| Project | Description | Main Skills Demonstrated |
| --- | --- | --- |
| [Student Course Management System](./StudentCourseManagement/README.md) | Admin dashboard to manage students, courses, and enrollments. | JWT auth, role-based authorization, EF Core relationships, DTOs, service/repository layers, React protected routes |
| [Job Application Tracker](./job-application-tracker/README.md) | Personal job tracking system for applications, interview stages, and dashboard analytics. | User authentication, per-user data access, CRUD APIs, filtering/search, dashboard metrics, responsive React UI |

## Tech Stack

Backend:
- ASP.NET Core Web API
- C#
- Entity Framework Core
- SQLite
- JWT Bearer Authentication
- Swagger / OpenAPI
- DTOs, services, repositories, LINQ

Frontend:
- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React icons
- Protected routes and dashboard layouts

Tooling:
- .NET SDK
- Node.js and npm
- EF Core CLI
- Git and GitHub

## Repository Structure

```text
.NET-Full-Stack-Projects/
├── StudentCourseManagement/
│   ├── StudentCourseManagement.Api/
│   ├── StudentCourseManagement.Client/
│   ├── INTERVIEW_NOTES.md
│   └── README.md
├── job-application-tracker/
│   ├── backend/JobTracker.Api/
│   ├── frontend/
│   └── README.md
├── .gitignore
└── README.md
```

## Requirements

- .NET SDK 10 or later
- Node.js 20 or later
- npm
- EF Core CLI
- VS Code or Visual Studio

Check installed versions:

```bash
dotnet --version
node --version
npm --version
dotnet ef --version
```

Install EF Core CLI if needed:

```bash
dotnet tool install --global dotnet-ef
```

## Quick Start

### Student Course Management System

Backend:

```bash
cd StudentCourseManagement
dotnet restore
dotnet ef database update --project StudentCourseManagement.Api --startup-project StudentCourseManagement.Api
dotnet run --project StudentCourseManagement.Api --launch-profile http
```

Frontend:

```bash
cd StudentCourseManagement/StudentCourseManagement.Client
npm install
cp .env.example .env
npm run dev
```

Default admin:

```text
Email: admin@studentcms.com
Password: Admin@123
```

### Job Application Tracker

Backend:

```bash
cd job-application-tracker/backend/JobTracker.Api
dotnet restore
dotnet ef database update
dotnet run --launch-profile http
```

Frontend:

```bash
cd job-application-tracker/frontend
npm install
cp .env.example .env
npm run dev
```

Register a new user from the app or use the `/api/auth/register` endpoint.

## Useful Local URLs

| Project | Frontend | API | Swagger |
| --- | --- | --- | --- |
| Student Course Management System | `http://localhost:5173` | `http://localhost:5075` | `http://localhost:5075/swagger` |
| Job Application Tracker | `http://localhost:5173` | `http://localhost:5000` | `http://localhost:5000/swagger` |

If a port is already in use, Vite may start on `5174`. Both APIs allow `localhost` and `127.0.0.1` on `5173` and `5174` for local CORS.

## Verification Commands

Run these before pushing:

```bash
# Student Course Management API
dotnet build StudentCourseManagement/StudentCourseManagement.slnx

# Student Course Management frontend
cd StudentCourseManagement/StudentCourseManagement.Client
npm run lint
npm run build
npm audit --audit-level=moderate
cd ../..

# Job Application Tracker API
dotnet build job-application-tracker/backend/JobTracker.Api/JobTracker.Api.csproj

# Job Application Tracker frontend
cd job-application-tracker/frontend
npm run lint
npm run build
npm audit --audit-level=moderate
```

## GitHub Push Checklist

- Do not commit generated folders such as `bin/`, `obj/`, `node_modules/`, or `dist/`.
- Do not commit local database files such as `*.db`, `*.db-wal`, or `*.db-shm`.
- Keep `.env.example` files committed, but keep real `.env` files ignored.
- Add screenshots to each project README after running the apps locally.
- Run build/lint commands before creating a final commit.

Suggested first commit:

```bash
git add .
git commit -m "Add full-stack .NET portfolio projects"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```

## Portfolio Positioning

These projects are designed to show practical, interview-friendly full-stack ability:
- Building REST APIs with clean controller/service/repository separation
- Designing relational models with EF Core
- Implementing JWT authentication and protected endpoints
- Connecting a React frontend to a secured API
- Managing state, forms, validation, loading states, error states, and responsive layouts
- Writing professional setup documentation for GitHub
