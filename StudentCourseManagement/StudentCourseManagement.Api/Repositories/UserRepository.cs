using Microsoft.EntityFrameworkCore;
using StudentCourseManagement.Api.Data;
using StudentCourseManagement.Api.Interfaces;
using StudentCourseManagement.Api.Models;

namespace StudentCourseManagement.Api.Repositories;

public class UserRepository(ApplicationDbContext dbContext) : IUserRepository
{
    public Task<User?> GetByEmailAsync(string email)
    {
        var normalizedEmail = email.Trim().ToLower();
        return dbContext.Users.FirstOrDefaultAsync(user => user.Email.ToLower() == normalizedEmail);
    }
}
