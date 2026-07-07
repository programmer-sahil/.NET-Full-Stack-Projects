using System.ComponentModel.DataAnnotations;

namespace StudentCourseManagement.Api.DTOs;

public class CourseUpdateDto
{
    [Required, MaxLength(20)]
    public string CourseCode { get; set; } = string.Empty;

    [Required, MaxLength(140)]
    public string CourseTitle { get; set; } = string.Empty;

    [Range(1, 8)]
    public int Credits { get; set; }

    [Required, MaxLength(120)]
    public string InstructorName { get; set; } = string.Empty;

    [MaxLength(800)]
    public string Description { get; set; } = string.Empty;
}
