using StudentCourseManagement.Api.DTOs;
using StudentCourseManagement.Api.Helpers;
using StudentCourseManagement.Api.Interfaces;

namespace StudentCourseManagement.Api.Services;

public class AuthService(
    IUserRepository userRepository,
    ITokenService tokenService,
    IConfiguration configuration) : IAuthService
{
    public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
    {
        var user = await userRepository.GetByEmailAsync(dto.Email);

        if (user is null || !PasswordHelper.VerifyPassword(dto.Password, user.PasswordHash))
        {
            throw new UnauthorizedRequestException("Invalid email or password.");
        }

        var expiryMinutes = int.TryParse(configuration["Jwt:ExpiryMinutes"], out var configuredExpiry)
            ? configuredExpiry
            : 120;

        var expiresAt = DateTime.UtcNow.AddMinutes(expiryMinutes);

        return new AuthResponseDto
        {
            Token = tokenService.GenerateToken(user, expiresAt),
            Email = user.Email,
            Role = user.Role,
            ExpiresAt = expiresAt
        };
    }
}
