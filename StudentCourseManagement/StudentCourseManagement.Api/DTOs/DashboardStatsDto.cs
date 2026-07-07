namespace StudentCourseManagement.Api.DTOs;

public class DashboardStatsDto
{
    public int TotalStudents { get; set; }
    public int TotalCourses { get; set; }
    public int TotalEnrollments { get; set; }
    public List<RecentEnrollmentDto> RecentEnrollments { get; set; } = [];
}
