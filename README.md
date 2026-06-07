# CSharpPractice

This repository contains beginner-friendly C#, OOP, SQL, and ASP.NET Core Web API projects.

It is organized as a learning path: start with C# fundamentals, move to OOP, practice SQL, then build CRUD APIs using ASP.NET Core and Entity Framework Core.

## Projects

```text
CSharpPractice/
|-- CSharp/
|-- OopEmployeeApp/
|-- SQLiteProject/
|-- ProductApi/
|-- EmployeeEfApi/
|-- EmployeeCrudApi/
|-- CSharpPractice.sln
|-- .gitignore
|-- .editorconfig
|-- .gitattributes
`-- README.md
```

## Project Summary

| Project | Type | Purpose |
| --- | --- | --- |
| `CSharp` | Console app | Practice C# basics, loops, functions, arrays, strings, and interview problems |
| `OopEmployeeApp` | Console app | Practice OOP concepts using employee classes |
| `SQLiteProject` | SQL project | Practice tables, keys, joins, CRUD queries, and grouping |
| `ProductApi` | ASP.NET Core Web API | Practice REST API CRUD using in-memory data |
| `EmployeeEfApi` | ASP.NET Core Web API | Practice EF Core CRUD with SQLite |
| `EmployeeCrudApi` | ASP.NET Core Web API | Practice database-backed employee CRUD with validation |

## Requirements

- .NET SDK 10 or later
- SQLite CLI for `SQLiteProject`
- VS Code or Visual Studio
- Git

Check .NET:

```bash
dotnet --version
```

Check SQLite:

```bash
sqlite3 --version
```

## Solution File

The repository contains:

```text
CSharpPractice.sln
```

This solution includes the C# console projects and ASP.NET Core API projects.

Build a single project:

```bash
dotnet build ProductApi/ProductApi.csproj
dotnet build EmployeeEfApi/EmployeeEfApi.csproj
dotnet build EmployeeCrudApi/EmployeeCrudApi.csproj
```

Run a single project:

```bash
dotnet run --project ProductApi/ProductApi.csproj
dotnet run --project EmployeeEfApi/EmployeeEfApi.csproj
dotnet run --project EmployeeCrudApi/EmployeeCrudApi.csproj
```

## Run Each Project

### CSharp

```bash
cd CSharp
dotnet run
```

### OopEmployeeApp

```bash
cd OopEmployeeApp
dotnet run
```

### SQLiteProject

```bash
cd SQLiteProject
sqlite3 student_course.db < student_course_project.sql
sqlite3 student_course.db
```

### ProductApi

```bash
cd ProductApi
dotnet run
```

Swagger:

```text
http://localhost:5098/swagger
```

### EmployeeEfApi

```bash
cd EmployeeEfApi
dotnet ef database update
dotnet run
```

Swagger:

```text
http://localhost:5296/swagger
```

### EmployeeCrudApi

```bash
cd EmployeeCrudApi
dotnet ef database update
dotnet run
```

Swagger:

```text
http://localhost:5040/swagger
```

## API Endpoints Overview

### ProductApi

Base URL:

```text
http://localhost:5098
```

| Method | Endpoint |
| --- | --- |
| GET | `/api/products` |
| GET | `/api/products/{id}` |
| POST | `/api/products` |
| PUT | `/api/products/{id}` |
| DELETE | `/api/products/{id}` |

### EmployeeEfApi

Base URL:

```text
http://localhost:5296
```

| Method | Endpoint |
| --- | --- |
| GET | `/api/employees` |
| GET | `/api/employees/{id}` |
| POST | `/api/employees` |
| PUT | `/api/employees/{id}` |
| DELETE | `/api/employees/{id}` |

### EmployeeCrudApi

Base URL:

```text
http://localhost:5040
```

| Method | Endpoint |
| --- | --- |
| GET | `/api/employees` |
| GET | `/api/employees/{id}` |
| POST | `/api/employees` |
| PUT | `/api/employees/{id}` |
| DELETE | `/api/employees/{id}` |

## Learning Path

1. Practice C# syntax and problem solving in `CSharp`.
2. Learn classes, inheritance, interfaces, and polymorphism in `OopEmployeeApp`.
3. Learn relational database basics in `SQLiteProject`.
4. Learn simple Web API CRUD in `ProductApi`.
5. Learn EF Core with SQLite in `EmployeeEfApi`.
6. Practice a more complete employee CRUD API in `EmployeeCrudApi`.
7. Add DTOs, services, validation attributes, authentication, and tests.

## GitHub Notes

Generated folders should not be pushed:

- `bin/`
- `obj/`

Database files like `employees.db` and `student_course.db` are learning/demo files. You can keep them for practice projects, but in professional projects databases are usually not committed.

Push to GitHub:

```bash
git init
git add .
git commit -m "Add C# practice projects and APIs"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME` with your real GitHub details.

