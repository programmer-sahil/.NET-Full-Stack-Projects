using StudentCourseManagement.Api.DTOs;

namespace StudentCourseManagement.Api.Interfaces;

public interface IDashboardService
{
    Task<DashboardStatsDto> GetStatsAsync();
}
