using StudentCourseManagement.Api.Models;

namespace StudentCourseManagement.Api.Interfaces;

public interface IEnrollmentRepository
{
    Task<List<Enrollment>> GetAllAsync();
    Task<List<Enrollment>> GetRecentAsync(int count);
    Task<Enrollment?> GetByIdAsync(int id);
    Task<bool> ExistsAsync(int studentId, int courseId, int? ignoreId = null);
    Task<int> CountAsync();
    Task AddAsync(Enrollment enrollment);
    void Delete(Enrollment enrollment);
    Task SaveChangesAsync();
}
