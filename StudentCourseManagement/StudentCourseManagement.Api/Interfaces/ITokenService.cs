using StudentCourseManagement.Api.Models;

namespace StudentCourseManagement.Api.Interfaces;

public interface ITokenService
{
    string GenerateToken(User user, DateTime expiresAt);
}
