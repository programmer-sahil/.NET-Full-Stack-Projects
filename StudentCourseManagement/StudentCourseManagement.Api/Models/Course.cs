using System.ComponentModel.DataAnnotations;

namespace StudentCourseManagement.Api.Models;

public class Course
{
    public int Id { get; set; }

    [MaxLength(20)]
    public string CourseCode { get; set; } = string.Empty;

    [MaxLength(140)]
    public string CourseTitle { get; set; } = string.Empty;

    public int Credits { get; set; }

    [MaxLength(120)]
    public string InstructorName { get; set; } = string.Empty;

    [MaxLength(800)]
    public string Description { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
}
