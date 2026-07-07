using StudentCourseManagement.Api.Models;

namespace StudentCourseManagement.Api.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
}
