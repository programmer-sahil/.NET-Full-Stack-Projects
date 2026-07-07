namespace StudentCourseManagement.Api.DTOs;

public class CourseDto
{
    public int Id { get; set; }
    public string CourseCode { get; set; } = string.Empty;
    public string CourseTitle { get; set; } = string.Empty;
    public int Credits { get; set; }
    public string InstructorName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
