using StudentCourseManagement.Api.DTOs;
using StudentCourseManagement.Api.Interfaces;

namespace StudentCourseManagement.Api.Services;

public class DashboardService(
    IStudentRepository studentRepository,
    ICourseRepository courseRepository,
    IEnrollmentRepository enrollmentRepository) : IDashboardService
{
    public async Task<DashboardStatsDto> GetStatsAsync()
    {
        var recentEnrollments = await enrollmentRepository.GetRecentAsync(5);

        return new DashboardStatsDto
        {
            TotalStudents = await studentRepository.CountAsync(),
            TotalCourses = await courseRepository.CountAsync(),
            TotalEnrollments = await enrollmentRepository.CountAsync(),
            RecentEnrollments = recentEnrollments.Select(enrollment => new RecentEnrollmentDto
            {
                Id = enrollment.Id,
                StudentName = enrollment.Student?.FullName ?? string.Empty,
                CourseTitle = enrollment.Course?.CourseTitle ?? string.Empty,
                EnrollmentDate = enrollment.EnrollmentDate
            }).ToList()
        };
    }
}
