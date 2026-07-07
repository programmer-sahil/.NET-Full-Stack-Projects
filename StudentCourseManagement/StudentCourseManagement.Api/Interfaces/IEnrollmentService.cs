using StudentCourseManagement.Api.DTOs;

namespace StudentCourseManagement.Api.Interfaces;

public interface IEnrollmentService
{
    Task<List<EnrollmentDto>> GetAllAsync();
    Task<EnrollmentDto> GetByIdAsync(int id);
    Task<EnrollmentDto> CreateAsync(EnrollmentCreateDto dto);
    Task<EnrollmentDto> UpdateAsync(int id, EnrollmentUpdateDto dto);
    Task DeleteAsync(int id);
}
