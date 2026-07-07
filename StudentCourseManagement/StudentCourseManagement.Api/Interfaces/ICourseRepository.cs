using StudentCourseManagement.Api.Models;

namespace StudentCourseManagement.Api.Interfaces;

public interface ICourseRepository
{
    Task<List<Course>> GetAllAsync(string? search);
    Task<Course?> GetByIdAsync(int id);
    Task<bool> CodeExistsAsync(string courseCode, int? ignoreId = null);
    Task<int> CountAsync();
    Task AddAsync(Course course);
    void Delete(Course course);
    Task SaveChangesAsync();
}
