namespace StudentCourseManagement.Api.DTOs;

public class RecentEnrollmentDto
{
    public int Id { get; set; }
    public string StudentName { get; set; } = string.Empty;
    public string CourseTitle { get; set; } = string.Empty;
    public DateTime EnrollmentDate { get; set; }
}
