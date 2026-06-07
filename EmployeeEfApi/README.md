# EmployeeEfApi

`EmployeeEfApi` is an ASP.NET Core Web API project that demonstrates CRUD operations using Entity Framework Core and SQLite.

This project focuses on learning database-backed API development with a simple employee model.

## Tech Stack

- C#
- ASP.NET Core Web API
- Entity Framework Core
- SQLite
- Swagger / OpenAPI
- .NET 10

## Features

- Employee CRUD API
- SQLite database
- EF Core `DbContext`
- EF Core migrations
- Async database operations
- Swagger UI
- Basic manual validation

## Folder Structure

```text
EmployeeEfApi/
|-- Controllers/
|   `-- EmployeesController.cs
|-- Data/
|   `-- AppDbContext.cs
|-- Migrations/
|-- Models/
|   `-- Employee.cs
|-- Properties/
|   `-- launchSettings.json
|-- Program.cs
|-- EmployeeEfApi.csproj
|-- appsettings.json
|-- employees.db
`-- README.md
```

## Project Flow

```text
HTTP Request
-> EmployeesController
-> AppDbContext
-> SQLite employees.db
-> HTTP Response
```

## Important Files

`Models/Employee.cs`

Represents employee data:

```csharp
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Department { get; set; } = "";
    public decimal Salary { get; set; }
    public string Email { get; set; } = "";
}
```

`Data/AppDbContext.cs`

Database context used by EF Core:

```csharp
public class AppDbContext : DbContext
{
    public DbSet<Employee> Employees { get; set; }
}
```

`Controllers/EmployeesController.cs`

Contains all employee CRUD endpoints.

`Program.cs`

Registers controllers, EF Core SQLite, Swagger, and middleware.

## How To Run

Open terminal inside this project:

```bash
cd CSharpPractice/EmployeeEfApi
```

Restore packages:

```bash
dotnet restore
```

Apply migrations:

```bash
dotnet ef database update
```

Run project:

```bash
dotnet run
```

Open Swagger:

```text
http://localhost:5296/swagger
```

HTTPS profile:

```text
https://localhost:7077/swagger
```

## API Endpoints

Base URL:

```text
http://localhost:5296
```

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/{id}` | Get employee by ID |
| POST | `/api/employees` | Create employee |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |

## Sample POST Body

```json
{
  "name": "Rahul",
  "department": "Support",
  "salary": 25000,
  "email": "rahul@example.com"
}
```

## Sample PUT Body

```json
{
  "id": 1,
  "name": "Rahul Sharma",
  "department": "Customer Support",
  "salary": 30000,
  "email": "rahul.sharma@example.com"
}
```

## Common EF Core Commands

Create migration:

```bash
dotnet ef migrations add InitialCreate
```

Apply migration:

```bash
dotnet ef database update
```

List migrations:

```bash
dotnet ef migrations list
```

## What I Learned

- How EF Core maps a C# class to a database table
- How `DbContext` works
- How controller methods use async database calls
- How to create REST API endpoints
- How to return proper HTTP status codes
- How to use Swagger for testing

## Future Improvements

- Add DTOs
- Add validation attributes
- Add service layer
- Add repository pattern
- Add search by department
- Add pagination
- Add authentication
- Add tests

