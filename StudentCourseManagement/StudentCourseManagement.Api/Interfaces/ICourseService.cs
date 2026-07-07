using StudentCourseManagement.Api.DTOs;

namespace StudentCourseManagement.Api.Interfaces;

public interface ICourseService
{
    Task<List<CourseDto>> GetAllAsync(string? search);
    Task<CourseDto> GetByIdAsync(int id);
    Task<CourseDto> CreateAsync(CourseCreateDto dto);
    Task<CourseDto> UpdateAsync(int id, CourseUpdateDto dto);
    Task DeleteAsync(int id);
}
