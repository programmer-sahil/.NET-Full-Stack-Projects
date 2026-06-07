# SQLiteProject

`SQLiteProject` is a SQL practice project that demonstrates a small Student Course Management database using SQLite.

This project is useful for learning relational database concepts before connecting databases to C# and ASP.NET Core.

## Tech Stack

- SQLite
- SQL
- Local database file

## Files

```text
SQLiteProject/
|-- student_course_project.sql
|-- student_course.db
`-- README.md
```

## Database Idea

The project contains three tables:

- `Students`
- `Courses`
- `Enrollments`

Relationship:

```text
Students 1-to-many Enrollments
Courses  1-to-many Enrollments
```

This creates a many-to-many relationship between students and courses through the `Enrollments` table.

## Tables

### Students

| Column | Type | Purpose |
| --- | --- | --- |
| `StudentId` | INTEGER PRIMARY KEY | Unique student ID |
| `Name` | TEXT | Student name |
| `Age` | INTEGER | Student age |
| `Email` | TEXT UNIQUE | Student email |

### Courses

| Column | Type | Purpose |
| --- | --- | --- |
| `CourseId` | INTEGER PRIMARY KEY | Unique course ID |
| `CourseName` | TEXT | Course name |
| `Fee` | REAL | Course fee |

### Enrollments

| Column | Type | Purpose |
| --- | --- | --- |
| `EnrollmentId` | INTEGER PRIMARY KEY | Unique enrollment ID |
| `StudentId` | INTEGER FOREIGN KEY | Linked student |
| `CourseId` | INTEGER FOREIGN KEY | Linked course |
| `EnrollmentDate` | TEXT | Enrollment date |

## SQL Concepts Practiced

| Concept | Used For |
| --- | --- |
| `CREATE TABLE` | Create database tables |
| `PRIMARY KEY` | Unique ID for rows |
| `FOREIGN KEY` | Connect related tables |
| `INSERT` | Add sample data |
| `SELECT` | Read data |
| `INNER JOIN` | Show only matching related data |
| `LEFT JOIN` | Show all students, even without courses |
| `GROUP BY` | Count students in each course |
| `UPDATE` | Change student age |
| `DELETE` | Remove an enrollment |

## How To Run The SQL Script

Open terminal inside this folder:

```bash
cd CSharpPractice/SQLiteProject
```

Run the SQL script with SQLite:

```bash
sqlite3 student_course.db < student_course_project.sql
```

Open the database:

```bash
sqlite3 student_course.db
```

Inside SQLite shell, run:

```sql
.tables
SELECT * FROM Students;
SELECT * FROM Courses;
SELECT * FROM Enrollments;
```

Exit SQLite:

```sql
.exit
```

## Important Queries

Show students with enrolled courses:

```sql
SELECT
    Students.Name,
    Courses.CourseName,
    Courses.Fee,
    Enrollments.EnrollmentDate
FROM Enrollments
INNER JOIN Students
ON Enrollments.StudentId = Students.StudentId
INNER JOIN Courses
ON Enrollments.CourseId = Courses.CourseId;
```

Show all students, even if not enrolled:

```sql
SELECT
    Students.Name,
    Courses.CourseName
FROM Students
LEFT JOIN Enrollments
ON Students.StudentId = Enrollments.StudentId
LEFT JOIN Courses
ON Enrollments.CourseId = Courses.CourseId;
```

Count students in each course:

```sql
SELECT
    Courses.CourseName,
    COUNT(Enrollments.StudentId) AS TotalStudents
FROM Courses
LEFT JOIN Enrollments
ON Courses.CourseId = Enrollments.CourseId
GROUP BY Courses.CourseName;
```

## What I Learned

- How relational tables are connected
- How primary keys and foreign keys work
- How many-to-many relationships work
- How joins combine data from multiple tables
- How to update and delete records
- How SQL knowledge helps when learning EF Core

## Next Steps

- Connect this database idea to a C# console app
- Create an ASP.NET Core Web API for students and courses
- Use Entity Framework Core migrations
- Add CRUD endpoints for students, courses, and enrollments

