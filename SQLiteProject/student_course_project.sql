-- Student Course Management Database

DROP TABLE IF EXISTS Enrollments;
DROP TABLE IF EXISTS Students;
DROP TABLE IF EXISTS Courses;

-- Students table
CREATE TABLE Students (
    StudentId INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Age INTEGER NOT NULL,
    Email TEXT UNIQUE NOT NULL
);

-- Courses table
CREATE TABLE Courses (
    CourseId INTEGER PRIMARY KEY AUTOINCREMENT,
    CourseName TEXT NOT NULL,
    Fee REAL NOT NULL
);

-- Enrollments table
CREATE TABLE Enrollments (
    EnrollmentId INTEGER PRIMARY KEY AUTOINCREMENT,
    StudentId INTEGER NOT NULL,
    CourseId INTEGER NOT NULL,
    EnrollmentDate TEXT NOT NULL,

    FOREIGN KEY (StudentId) REFERENCES Students(StudentId),
    FOREIGN KEY (CourseId) REFERENCES Courses(CourseId)
);

-- Insert students
INSERT INTO Students (Name, Age, Email)
VALUES
('Sahil', 25, 'sahil@example.com'),
('Rahul', 22, 'rahul@example.com'),
('Amit', 24, 'amit@example.com'),
('Priya', 23, 'priya@example.com');

-- Insert courses
INSERT INTO Courses (CourseName, Fee)
VALUES
('C# Basics', 3000),
('ASP.NET Core', 5000),
('SQL Server', 4000),
('Entity Framework Core', 4500);

-- Insert enrollments
INSERT INTO Enrollments (StudentId, CourseId, EnrollmentDate)
VALUES
(1, 1, '2026-06-05'),
(1, 2, '2026-06-05'),
(2, 1, '2026-06-05'),
(3, 3, '2026-06-05');

-- 1. Show all students
SELECT * FROM Students;

-- 2. Show all courses
SELECT * FROM Courses;

-- 3. Show all enrollments
SELECT * FROM Enrollments;

-- 4. INNER JOIN: Show students with their enrolled courses
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

-- 5. LEFT JOIN: Show all students, even if not enrolled
SELECT 
    Students.Name,
    Courses.CourseName
FROM Students
LEFT JOIN Enrollments
ON Students.StudentId = Enrollments.StudentId
LEFT JOIN Courses
ON Enrollments.CourseId = Courses.CourseId;

-- 6. Count students in each course
SELECT 
    Courses.CourseName,
    COUNT(Enrollments.StudentId) AS TotalStudents
FROM Courses
LEFT JOIN Enrollments
ON Courses.CourseId = Enrollments.CourseId
GROUP BY Courses.CourseName;

-- 7. Update student age
UPDATE Students
SET Age = 26
WHERE StudentId = 1;

-- 8. Delete one enrollment
DELETE FROM Enrollments
WHERE EnrollmentId = 4;

-- 9. Final data after update/delete
SELECT * FROM Students;
SELECT * FROM Enrollments;