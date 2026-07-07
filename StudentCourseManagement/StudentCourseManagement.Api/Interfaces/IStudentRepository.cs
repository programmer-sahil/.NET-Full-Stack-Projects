using StudentCourseManagement.Api.Models;

namespace StudentCourseManagement.Api.Interfaces;

public interface IStudentRepository
{
    Task<List<Student>> GetAllAsync(string? search);
    Task<Student?> GetByIdAsync(int id);
    Task<bool> EmailExistsAsync(string email, int? ignoreId = null);
    Task<int> CountAsync();
    Task AddAsync(Student student);
    void Delete(Student student);
    Task SaveChangesAsync();
}
