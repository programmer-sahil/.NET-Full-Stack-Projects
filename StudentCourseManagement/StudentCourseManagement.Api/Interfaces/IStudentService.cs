using StudentCourseManagement.Api.DTOs;

namespace StudentCourseManagement.Api.Interfaces;

public interface IStudentService
{
    Task<List<StudentDto>> GetAllAsync(string? search);
    Task<StudentDto> GetByIdAsync(int id);
    Task<StudentDto> CreateAsync(StudentCreateDto dto);
    Task<StudentDto> UpdateAsync(int id, StudentUpdateDto dto);
    Task DeleteAsync(int id);
}
