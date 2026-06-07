# OopEmployeeApp

`OopEmployeeApp` is a beginner-friendly C# console application that demonstrates Object-Oriented Programming concepts using an employee management example.

The project shows how classes, inheritance, abstraction, interfaces, encapsulation, method overriding, and polymorphism work together in a real program.



## Project Features

- Stores employees in a `List<Employee>`
- Supports full-time and part-time employee types
- Displays employee details
- Calculates employee bonus differently for each employee type
- Demonstrates inheritance from an abstract base class
- Demonstrates interface implementation
- Demonstrates runtime polymorphism using overridden methods

## OOP Concepts Used

### Class And Object

Files like `Employee.cs`, `FullTimeEmployee.cs`, and `PartTimeEmployee.cs` define classes.

Objects are created in `Program.cs`:

```csharp
employees.Add(new FullTimeEmployee(1, "Sahil", 25, "IT", 30000, 12));
employees.Add(new PartTimeEmployee(2, "Rahul", 22, "Support", 15000, 80));
```

### Abstraction

`Person` is an abstract class:

```csharp
abstract class Person
{
    public abstract void DisplayInfo();
}
```

This means every child class must provide its own implementation of `DisplayInfo()`.

### Inheritance

`Employee` inherits from `Person`:

```csharp
class Employee : Person, IWork
```

`FullTimeEmployee` and `PartTimeEmployee` inherit from `Employee`:

```csharp
class FullTimeEmployee : Employee
class PartTimeEmployee : Employee
```

### Encapsulation

The `salary` field is private:

```csharp
private decimal salary;
```

The public `Salary` property controls how salary is assigned. If a negative salary is passed, it stores `0`.

### Interface

`IWork` defines a contract:

```csharp
interface IWork
{
    void Work();
}
```

`Employee` implements this interface.

### Polymorphism

The app stores different employee types inside one list:

```csharp
List<Employee> employees = new List<Employee>();
```

When this method is called:

```csharp
employee.CalculateBonus();
```

C# automatically runs the correct version based on the actual object type:

- `FullTimeEmployee` gives 10% bonus
- `PartTimeEmployee` gives 2% bonus
- Base `Employee` gives 5% bonus

## Folder Structure

```text
OopEmployeeApp/
├── Employee.cs
├── FullTimeEmployee.cs
├── IWork.cs
├── OopEmployeeApp.csproj
├── PartTimeEmployee.cs
├── Person.cs
├── Program.cs
└── README.md
```

## File Explanation

### `Program.cs`

Entry point of the application.

It creates employee objects, stores them in a list, loops through them, displays details, calls `Work()`, and calculates bonuses.

### `Person.cs`

Abstract base class.

Contains common person data:

- `Id`
- `Name`
- `Age`
- `Greet()`
- abstract `DisplayInfo()`

### `Employee.cs`

Main employee class.

It inherits from `Person` and implements `IWork`.

Contains:

- `Department`
- private `salary`
- `Salary` property
- `DisplayInfo()`
- `CalculateBonus()`
- `Work()`

### `FullTimeEmployee.cs`

Child class of `Employee`.

Adds:

- `PaidLeaves`
- custom bonus calculation
- custom display output

### `PartTimeEmployee.cs`

Child class of `Employee`.

Adds:

- `WorkingHours`
- custom bonus calculation
- custom display output

### `IWork.cs`

Interface that requires a `Work()` method.

### `OopEmployeeApp.csproj`

C# project file used by the .NET CLI to build and run the app.

## How To Run

Open terminal inside this folder:

```bash
cd /Users/sksahil/Downloads/TUITIONS/NYCTA/DOT_NET/CSharpPractice/OopEmployeeApp
```

Check .NET version:

```bash
dotnet --version
```

Run the app:

```bash
dotnet run
```

Build the app:

```bash
dotnet build
```

Clean generated files:

```bash
dotnet clean
```

## Sample Output

```text
===== Employee Management OOP App =====
--------------------------------
Hello, my name is Sahil.
ID: 1
Name: Sahil
Age: 25
Department: IT
Salary: 30000
Employee Type: Full Time
Paid Leaves: 12
Sahil is working in IT department.
Bonus: 3000.00
```

## What This Project Teaches

- How to split C# code into multiple files
- How base classes and child classes work
- How constructors pass values to parent classes using `base(...)`
- How private fields protect data
- How properties validate data
- How interfaces define required behavior
- How overridden methods work
- How polymorphism works with a list of base-class objects

## Future Improvements

- Add user input to create employees from the console
- Add search employee by ID
- Add update employee salary
- Add delete employee
- Add menu-driven console UI
- Add file saving and loading
- Add Entity Framework Core with database
- Add unit tests
- Convert this app into an ASP.NET Core Web API

## GitHub Push Commands

From the `CSharpPractice` folder:

```bash
git init
git status
git add .
git commit -m "Add C# practice and OOP employee app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```

Replace:

```text
YOUR_USERNAME
YOUR_REPOSITORY_NAME
```

with your real GitHub username and repository name.

