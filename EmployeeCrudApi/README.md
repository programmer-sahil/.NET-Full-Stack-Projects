# EmployeeCrudApi

`EmployeeCrudApi` is an ASP.NET Core Web API project for practicing full CRUD operations with Entity Framework Core and SQLite.

This project is useful for learning how a backend API connects to a database, exposes REST endpoints, validates request data, and returns proper HTTP responses.

## Tech Stack

- C#
- ASP.NET Core Web API
- Entity Framework Core
- SQLite
- Swagger / OpenAPI
- .NET 10

## Features

- Get all employees
- Get employee by ID
- Add a new employee
- Update an employee
- Delete an employee
- Basic request validation
- SQLite database storage
- EF Core migrations
- Swagger UI for API testing

## Folder Structure

```text
EmployeeCrudApi/
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
|-- EmployeeCrudApi.csproj
|-- appsettings.json
|-- employees.db
`-- README.md
```

## Important Files

`Program.cs`

Configures services, registers controllers, connects EF Core to SQLite, enables Swagger, and maps API controllers.

`Models/Employee.cs`

Defines the employee table/model:

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

Represents the database context and exposes the `Employees` table:

```csharp
public DbSet<Employee> Employees { get; set; }
```

`Controllers/EmployeesController.cs`

Contains the API endpoints for employee CRUD operations.

`appsettings.json`

Stores the SQLite connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=employees.db"
  }
}
```

## How To Run

Open terminal inside this project:

```bash
cd CSharpPractice/EmployeeCrudApi
```

Restore packages:

```bash
dotnet restore
```

Apply database migrations:

```bash
dotnet ef database update
```

Run the API:

```bash
dotnet run
```

Open Swagger:

```text
http://localhost:5040/swagger
```

HTTPS profile:

```text
https://localhost:7075/swagger
```

## API Endpoints

Base URL:

```text
http://localhost:5040
```

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/{id}` | Get one employee by ID |
| POST | `/api/employees` | Add a new employee |
| PUT | `/api/employees/{id}` | Update an existing employee |
| DELETE | `/api/employees/{id}` | Delete an employee |

## Sample JSON For POST

```json
{
  "name": "Sahil",
  "department": "IT",
  "salary": 30000,
  "email": "sahil@example.com"
}
```

## Sample JSON For PUT

Make sure the `id` in the URL and body are the same.

```json
{
  "id": 1,
  "name": "Sahil Khan",
  "department": "Software",
  "salary": 45000,
  "email": "sahil.khan@example.com"
}
```

## Validation Rules

- `Name` is required.
- `Department` is required.
- `Salary` must be greater than `0`.
- `Email` is required.
- For `PUT`, URL ID and body ID must match.

## EF Core Commands

Install EF tool if needed:

```bash
dotnet tool install --global dotnet-ef
```

Create migration:

```bash
dotnet ef migrations add InitialCreate
```

Update database:

```bash
dotnet ef database update
```

Remove last migration before applying it:

```bash
dotnet ef migrations remove
```

## What I Learned

- How to create an ASP.NET Core Web API
- How to create controller-based endpoints
- How to use EF Core with SQLite
- How to create and apply migrations
- How to validate input manually
- How to return `Ok`, `CreatedAtAction`, `BadRequest`, `NotFound`, and `NoContent`

## Future Improvements

- Add DTO classes
- Add service layer
- Add repository layer
- Add email format validation
- Add search and filter endpoints
- Add pagination
- Add authentication and authorization
- Add unit and integration tests

