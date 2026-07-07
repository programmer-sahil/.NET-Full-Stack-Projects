using System.ComponentModel.DataAnnotations;

namespace StudentCourseManagement.Api.Models;

public class Student
{
    public int Id { get; set; }

    [MaxLength(120)]
    public string FullName { get; set; } = string.Empty;

    [MaxLength(150)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(20)]
    public string Phone { get; set; } = string.Empty;

    [MaxLength(80)]
    public string Department { get; set; } = string.Empty;

    public DateTime DateOfBirth { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
}
