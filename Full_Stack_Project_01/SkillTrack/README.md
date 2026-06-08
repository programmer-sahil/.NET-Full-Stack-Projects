# SkillTrack Pro – Full-Stack Learning and Task Management System

SkillTrack Pro is a full-stack learning and task management application where users can manage learning courses, create and track tasks, monitor progress, and use role-based dashboards.

This project was developed as a practical learning project to demonstrate React.js frontend development, ASP.NET Core Web API backend development, SQLite database integration, Entity Framework Core, JWT authentication, role-based authorization, REST API design, and frontend-backend integration.

## Key Features 🚀

- User registration and login
- JWT-based authentication
- Logout with local session cleanup
- Protected frontend routes
- Role-based access control
- Admin and Student roles
- Admin can create, update, and delete courses
- Students can view available courses
- Users can create, update, delete, and filter learning tasks
- Admin can view all users' tasks
- Students can view only their own tasks
- Dashboard summary with course, task, progress, and priority statistics
- Course CRUD
- Task CRUD
- Course search by title
- Task filtering by status and priority
- Responsive React UI
- SQLite database persistence
- EF Core relationships
- CORS configuration for the React frontend
- API integration using Axios

## Demo Accounts 🔐

Seed data is included in `SkillTrackApi/Data/SeedData.cs`.

| Role | Email | Password |
| --- | --- | --- |
| Admin | [admin@skilltrack.com](mailto:admin@skilltrack.com) | `Admin@123` |
| Student | [student@skilltrack.com](mailto:student@skilltrack.com) | `Student@123` |

## Tech Stack 🧰

| Layer | Technologies |
| --- | --- |
| Frontend | React.js, Vite, JavaScript, React Router DOM, Axios, CSS |
| Backend | ASP.NET Core Web API, C#, Entity Framework Core, SQLite, JWT Bearer Authentication, PBKDF2 password hashing, role-based authorization, CORS |
| Database | SQLite, EF Core Code First model configuration, `EnsureCreated` database initialization |
| Tools | VS Code, .NET CLI, npm, Browser DevTools, Git and GitHub, Postman or REST client for API testing |

## Project Architecture 🏗️

```text
SkillTrack/
├── README.md
├── SkillTrackApi/
│   ├── Controllers/
│   ├── Data/
│   ├── DTOs/
│   ├── Models/
│   ├── Properties/
│   ├── Services/
│   ├── Program.cs
│   ├── SkillTrackApi.csproj
│   ├── SkillTrackApi.http
│   ├── appsettings.Development.json
│   ├── appsettings.json
│   └── skilltrack.db
│
└── skilltrack-client/
    ├── public/
    ├── src/
    │   ├── api/
    │   ├── assets/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    └── vite.config.js
```

## Backend Explanation

### Models

The `Models` folder contains the EF Core database entities:

- `AppUser`: stores user profile, email, password hash, role, creation date, and related tasks
- `Course`: stores course title, description, category, duration, creation date, and related tasks
- `LearningTask`: stores task title, description, status, priority, due date, course relationship, and user relationship

### DTOs

The `DTOs` folder contains request and response objects used by the API. These keep the API contract separate from the database entities. Examples include `RegisterDto`, `LoginDto`, `AuthResponseDto`, `CourseCreateDto`, `CourseReadDto`, `LearningTaskCreateDto`, and `LearningTaskReadDto`.

### Data

The `Data` folder contains:

- `AppDbContext`: EF Core database context with `Users`, `Courses`, and `LearningTasks`
- `SeedData`: creates demo Admin and Student users, sample courses, and sample learning tasks

The database is initialized in `Program.cs` using `db.Database.EnsureCreated()`.

### Services

The `Services` folder contains:

- `JwtTokenService`: generates JWT tokens with user ID, name, email, and role claims
- `PasswordService`: hashes and verifies passwords using PBKDF2 with SHA-256

### Controllers

The `Controllers` folder contains REST API endpoints:

- `AuthController`: registration, login, and current user profile
- `CoursesController`: course listing and Admin-only course CRUD
- `TasksController`: task CRUD with owner/Admin authorization rules
- `DashboardController`: dashboard summary statistics

### Program.cs

`Program.cs` registers controllers, SQLite EF Core, JWT authentication, authorization, CORS, JSON options, database initialization, and controller routing.

The backend project references `Microsoft.AspNetCore.OpenApi`, but `Program.cs` does not currently configure Swagger UI or map OpenAPI endpoints. API testing should be done through the React frontend, Postman, Browser DevTools, or another REST client unless OpenAPI configuration is added later.

## Frontend Explanation

- `src/api/api.js` creates the Axios client, reads `VITE_API_BASE_URL`, and attaches the JWT token from `localStorage` to API requests using the `Authorization: Bearer <token>` header.
- `src/context/AuthContext.jsx` manages login, register, logout, user state, authentication status, Admin role detection, and `localStorage` persistence.
- `src/components/ProtectedRoute.jsx` prevents unauthenticated users from accessing private pages.
- `src/components/Navbar.jsx` changes navigation links based on login status and displays the logged-in user's name and role.
- `src/pages/Landing.jsx` shows the project landing page and demo accounts.
- `src/pages/Login.jsx` handles user login.
- `src/pages/Register.jsx` handles student registration.
- `src/pages/Dashboard.jsx` displays role-aware summary statistics.
- `src/pages/Courses.jsx` lets Admin users manage courses and lets Student users view/search courses.
- `src/pages/Tasks.jsx` lets users manage tasks and filter them by status and priority.

## Authentication and Authorization Flow

1. A user registers or logs in from the React frontend.
2. The ASP.NET Core backend validates the request.
3. For login, the backend verifies the submitted password against the stored password hash.
4. The backend generates a JWT token containing user identity and role claims.
5. The frontend stores the token and user data in `localStorage`.
6. Axios sends the token with protected API requests.
7. Backend endpoints use `[Authorize]` to require authentication.
8. Admin-only endpoints use `[Authorize(Roles = "Admin")]`.
9. Task endpoints allow Admin users to access all tasks, while Student users can access only their own tasks.

## Database Design

Main entities:

- `AppUser` has many `LearningTask` records.
- `Course` has many `LearningTask` records.
- `LearningTask` belongs to one `AppUser` and one `Course`.
- `AppUser.Email` is configured as a unique index in `AppDbContext`.

Relationship diagram:

```text
AppUser (1) ---- (many) LearningTask
Course  (1) ---- (many) LearningTask
```

Delete behavior:

- Deleting a user cascades to that user's tasks.
- Deleting a course cascades to related tasks.

## API Endpoints 🌐

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Public | Register a new Student user and return JWT auth response |
| POST | `/api/auth/login` | Public | Login with email/password and return JWT auth response |
| GET | `/api/auth/me` | Authenticated users | Return the current logged-in user's profile |
| GET | `/api/dashboard/summary` | Authenticated users | Return dashboard statistics; Admin sees all-task/user summary, Student sees own-task summary |
| GET | `/api/courses` | Authenticated users | Get all courses |
| GET | `/api/courses/{id}` | Authenticated users | Get one course by ID |
| POST | `/api/courses` | Admin only | Create a course |
| PUT | `/api/courses/{id}` | Admin only | Update a course |
| DELETE | `/api/courses/{id}` | Admin only | Delete a course |
| GET | `/api/tasks?status=&priority=&courseId=` | Authenticated users | Get tasks with optional filters; Admin sees all tasks, Student sees own tasks |
| GET | `/api/tasks/{id}` | Owner/Admin | Get one task by ID |
| POST | `/api/tasks` | Authenticated users | Create a task for the current user |
| PUT | `/api/tasks/{id}` | Owner/Admin | Update a task |
| DELETE | `/api/tasks/{id}` | Owner/Admin | Delete a task |

## Installation and Setup ⚙️

### Prerequisites

- .NET SDK compatible with the backend target framework (`net10.0`)
- Node.js and npm
- VS Code
- Git

### Backend Setup

```bash
cd SkillTrackApi
dotnet restore
dotnet run
```

Backend URL:

```text
http://localhost:5098
```

### Frontend Setup

```bash
cd skilltrack-client
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Environment Variables

The frontend `.env` file contains:

```env
VITE_API_BASE_URL=http://localhost:5098/api
```

The backend JWT settings are stored in `SkillTrackApi/appsettings.json`:

| Setting | Purpose |
| --- | --- |
| `Jwt:Key` | Secret key used to sign JWT tokens |
| `Jwt:Issuer` | Token issuer value |
| `Jwt:Audience` | Token audience value |
| `Jwt:ExpiresInMinutes` | Token expiration time in minutes |

For learning purposes, the JWT key is inside `appsettings.json`. In production, it should be stored securely using environment variables, .NET user secrets, or a secret manager.

## How to Run the Full Project

Open two terminals from the project root.

Terminal 1 - Backend:

```bash
cd SkillTrackApi
dotnet run
```

Terminal 2 - Frontend:

```bash
cd skilltrack-client
npm run dev
```

Then open:

```text
http://localhost:5173
```

## How to Test the Application

1. Run the backend API.
2. Run the React frontend.
3. Open the landing page in the browser.
4. Login as Admin using `admin@skilltrack.com` and `Admin@123`.
5. Open the Courses page and create a course.
6. Open the Tasks page and create a task.
7. Use task filters for status and priority.
8. Logout.
9. Login as Student using `student@skilltrack.com` and `Student@123`.
10. View available courses.
11. Create a student task.
12. Confirm the Student account sees only its own tasks.
13. Login again as Admin and confirm Admin can see all users' tasks.

## Screenshots 📸

Add screenshots here after running the app:

![Landing Page](screenshots/landing.png)
![Login Page](screenshots/login.png)
![Dashboard](screenshots/dashboard.png)
![Courses Page](screenshots/courses.png)
![Tasks Page](screenshots/tasks.png)
![Admin View](screenshots/admin-view.png)
![Student View](screenshots/student-view.png)

## Important Concepts Learned

- ASP.NET Core Web API project structure
- REST API design
- Entity Framework Core with SQLite
- One-to-many relationships
- DTO pattern
- Password hashing
- JWT authentication
- Role-based authorization
- React Router
- Protected frontend routes
- Axios API integration
- CORS
- State management using React Context
- LocalStorage token handling
- CRUD operations
- Dashboard analytics
- Frontend-backend integration and manual end-to-end testing

## Interview Explanation

I built SkillTrack Pro, a full-stack learning and task management system using React.js, ASP.NET Core Web API, SQLite, Entity Framework Core, and JWT authentication. The application supports Admin and Student roles, protected API endpoints, course management, user-specific task management, dashboard analytics, and frontend-backend communication using Axios. I implemented authentication using JWT tokens, stored user sessions on the frontend, and used role-based authorization to restrict course management to Admin users.

## Challenges Faced and Solutions

| Challenge | Solution |
| --- | --- |
| Connecting the React frontend with the ASP.NET Core backend | Created a centralized Axios client with a configurable API base URL |
| Handling CORS during local development | Added a CORS policy that allows the Vite frontend at `http://localhost:5173` |
| Managing JWT tokens in the frontend | Stored the token and user profile in `localStorage` and attached the token through an Axios interceptor |
| Protecting backend endpoints | Used `[Authorize]` and JWT Bearer authentication middleware |
| Creating database relationships using EF Core | Configured one-to-many relationships in `AppDbContext` |
| Handling role-based access | Used role claims in JWT tokens and `[Authorize(Roles = "Admin")]` for Admin-only endpoints |
| Fixing package/version issues during setup | Verified backend package references and frontend dependencies through `.csproj` and `package.json` |
| Testing frontend and backend together | Tested login, protected routes, CRUD operations, filters, and role-specific behavior through the browser and API requests |

## Future Improvements

- Add refresh token authentication
- Add forgot password
- Add profile page
- Add task deadline reminders
- Add charts
- Add pagination
- Add file upload
- Add deployment
- Add unit testing
- Add proper EF Core migrations
- Add production-ready environment configuration
- Add Swagger/OpenAPI configuration if API documentation is needed

## CV Project Summary 📝

SkillTrack Pro can be added to a resume as:

> Built a full-stack learning and task management platform using React.js, ASP.NET Core Web API, SQLite, Entity Framework Core, and JWT authentication. Implemented role-based access control, protected routes, course CRUD, user-specific task management, dashboard analytics, filtering, and responsive UI.
