using StudentCourseManagement.Api.DTOs;

namespace StudentCourseManagement.Api.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> LoginAsync(LoginDto dto);
}
