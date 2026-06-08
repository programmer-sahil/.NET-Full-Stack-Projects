using SkillTrackApi.Models;
using SkillTrackApi.Services;

namespace SkillTrackApi.Data;

public static class SeedData
{
    public static void Initialize(AppDbContext context)
    {
        if (!context.Users.Any())
        {
            var admin = new AppUser
            {
                FullName = "Admin User",
                Email = "admin@skilltrack.com",
                PasswordHash = PasswordService.HashPassword("Admin@123"),
                Role = "Admin"
            };

            var student = new AppUser
            {
                FullName = "Student User",
                Email = "student@skilltrack.com",
                PasswordHash = PasswordService.HashPassword("Student@123"),
                Role = "Student"
            };

            context.Users.AddRange(admin, student);
            context.SaveChanges();
        }

        if (!context.Courses.Any())
        {
            var course1 = new Course
            {
                Title = "ASP.NET Core Web API",
                Description = "Learn controllers, routing, SQLite, EF Core, JWT, and Swagger.",
                Category = ".NET",
                DurationHours = 20
            };

            var course2 = new Course
            {
                Title = "React.js Frontend",
                Description = "Learn components, routing, forms, Axios, and API integration.",
                Category = "Frontend",
                DurationHours = 18
            };

            context.Courses.AddRange(course1, course2);
            context.SaveChanges();
        }

        if (!context.LearningTasks.Any())
        {
            var student = context.Users.FirstOrDefault(u => u.Email == "student@skilltrack.com");
            var aspCourse = context.Courses.FirstOrDefault(c => c.Title == "ASP.NET Core Web API");
            var reactCourse = context.Courses.FirstOrDefault(c => c.Title == "React.js Frontend");

            if (student == null || aspCourse == null || reactCourse == null)
            {
                return;
            }

            var tasks = new List<LearningTask>
            {
                new LearningTask
                {
                    Title = "Create first API controller",
                    Description = "Build and test a simple GET endpoint.",
                    Status = "Completed",
                    Priority = "High",
                    DueDate = DateTime.UtcNow.AddDays(1),
                    CourseId = aspCourse.Id,
                    UserId = student.Id
                },
                new LearningTask
                {
                    Title = "Connect React with API",
                    Description = "Use Axios to fetch data from ASP.NET Core backend.",
                    Status = "Pending",
                    Priority = "Medium",
                    DueDate = DateTime.UtcNow.AddDays(3),
                    CourseId = reactCourse.Id,
                    UserId = student.Id
                }
            };

            context.LearningTasks.AddRange(tasks);
            context.SaveChanges();
        }
    }
}