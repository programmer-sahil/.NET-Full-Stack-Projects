using Microsoft.EntityFrameworkCore;
using StudentCourseManagement.Api.Models;

namespace StudentCourseManagement.Api.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Student> Students => Set<Student>();
    public DbSet<Course> Courses => Set<Course>();
    public DbSet<Enrollment> Enrollments => Set<Enrollment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasIndex(user => user.Email)
            .IsUnique();

        modelBuilder.Entity<Student>()
            .HasIndex(student => student.Email)
            .IsUnique();

        modelBuilder.Entity<Course>()
            .HasIndex(course => course.CourseCode)
            .IsUnique();

        modelBuilder.Entity<Enrollment>()
            .HasIndex(enrollment => new { enrollment.StudentId, enrollment.CourseId })
            .IsUnique();

        modelBuilder.Entity<Enrollment>()
            .HasOne(enrollment => enrollment.Student)
            .WithMany(student => student.Enrollments)
            .HasForeignKey(enrollment => enrollment.StudentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Enrollment>()
            .HasOne(enrollment => enrollment.Course)
            .WithMany(course => course.Enrollments)
            .HasForeignKey(enrollment => enrollment.CourseId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
