using System.ComponentModel.DataAnnotations;

namespace StudentCourseManagement.Api.DTOs;

public class EnrollmentUpdateDto
{
    [Range(1, int.MaxValue, ErrorMessage = "Student is required.")]
    public int StudentId { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Course is required.")]
    public int CourseId { get; set; }

    [MaxLength(10)]
    public string? Grade { get; set; }
}
