using System.ComponentModel.DataAnnotations;

namespace StudentCourseManagement.Api.Models;

public class Enrollment
{
    public int Id { get; set; }

    public int StudentId { get; set; }

    public Student? Student { get; set; }

    public int CourseId { get; set; }

    public Course? Course { get; set; }

    public DateTime EnrollmentDate { get; set; } = DateTime.UtcNow;

    [MaxLength(10)]
    public string? Grade { get; set; }
}
