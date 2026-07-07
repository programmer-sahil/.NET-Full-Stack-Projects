# Job Application Tracker

Job Application Tracker is a full-stack web application for managing job applications, tracking interview progress, and reviewing application status analytics. It is built with ASP.NET Core Web API, React, EF Core, SQLite, and JWT authentication.

This project is suitable for a fresher .NET developer portfolio because it demonstrates authentication, protected user data, CRUD operations, search/filtering, API integration, and a polished React dashboard.

## Highlights

- User registration and login
- JWT-based authentication
- BCrypt password hashing
- Protected API routes
- Logged-in users can access only their own applications
- Add, view, edit, and delete job applications
- Search and filter applications by query and status
- Dashboard cards for total, applied, interview, selected, and rejected counts
- Recent applications list
- Status distribution UI
- Swagger UI for API testing
- Responsive Tailwind CSS frontend
- Axios instance with automatic JWT header handling

## Tech Stack

Backend:
- ASP.NET Core Web API
- C#
- Entity Framework Core
- SQLite
- JWT Bearer Authentication
- BCrypt.Net-Next
- Swagger / OpenAPI
- DTOs and LINQ

Frontend:
- React with Vite
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React icons
- Protected routes

## Architecture

```text
Frontend React Pages
→ Axios API Layer
→ ASP.NET Core Controllers
→ EF Core DbContext
→ SQLite Database
```

The API uses JWT claims to identify the logged-in user. Application queries are filtered by user id so one user cannot access another user's job applications.

## Folder Structure

```text
job-application-tracker/
├── backend/
│   └── JobTracker.Api/
│       ├── Controllers/
│       ├── Data/
│       ├── DTOs/
│       ├── Migrations/
│       ├── Models/
│       ├── Services/
│       ├── Program.cs
│       └── appsettings.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── utils/
│   ├── package.json
│   └── tailwind.config.js
├── .gitignore
└── README.md
```

## Backend Setup

```bash
cd job-application-tracker/backend/JobTracker.Api
dotnet restore
dotnet ef database update
dotnet run --launch-profile http
```

Backend URLs:

```text
API:     http://localhost:5000
Swagger: http://localhost:5000/swagger
```

If EF Core tools are not installed:

```bash
dotnet tool install --global dotnet-ef
```

## Frontend Setup

```bash
cd job-application-tracker/frontend
npm install
cp .env.example .env
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

The default API URL is:

```text
http://localhost:5000/api
```

To override it, edit `frontend/.env`:

```text
VITE_API_BASE_URL=http://localhost:5000/api
```

## Authentication Flow

1. A user registers through `POST /api/auth/register`.
2. The password is hashed using BCrypt before saving.
3. The user logs in through `POST /api/auth/login`.
4. The API returns a JWT token.
5. The frontend stores the token in `localStorage`.
6. Axios attaches the token to protected requests.
7. The backend validates the token and filters application data by logged-in user.

## API Endpoints

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Login and receive JWT |
| GET | `/api/applications` | Yes | Get current user's applications |
| GET | `/api/applications/{id}` | Yes | Get one application |
| POST | `/api/applications` | Yes | Create application |
| PUT | `/api/applications/{id}` | Yes | Update application |
| DELETE | `/api/applications/{id}` | Yes | Delete application |
| GET | `/api/applications/search?query=&status=` | Yes | Search and filter applications |
| GET | `/api/dashboard/stats` | Yes | Get dashboard analytics |

## Database

The project uses SQLite with EF Core migrations.

Generated database file:

```text
backend/JobTracker.Api/jobtracker.db
```

The database file is ignored by Git. The schema is versioned in:

```text
backend/JobTracker.Api/Migrations
```

Useful commands:

```bash
dotnet ef migrations add MigrationName
dotnet ef database update
dotnet ef migrations remove
```

Run these commands from:

```text
job-application-tracker/backend/JobTracker.Api
```

## Verification

Backend:

```bash
cd job-application-tracker/backend/JobTracker.Api
dotnet build
```

Frontend:

```bash
cd job-application-tracker/frontend
npm run lint
npm run build
npm audit --audit-level=moderate
```

## Screenshots

Add screenshots before publishing the repository:

- Login page
- Register page
- Dashboard
- Applications list
- Add/edit application form

## Future Improvements

- Email reminders for follow-ups
- Export applications to CSV or PDF
- Kanban board by status
- Interview calendar
- Cloud deployment with hosted database
- Unit and integration tests
- Resume/company contact attachments

## Interview Talking Points

- Why JWT authentication is used
- How BCrypt protects user passwords
- How the API restricts application data to the logged-in user
- How EF Core migrations version the database schema
- How React protected routes prevent unauthenticated access
- How Axios interceptors attach JWT tokens automatically
