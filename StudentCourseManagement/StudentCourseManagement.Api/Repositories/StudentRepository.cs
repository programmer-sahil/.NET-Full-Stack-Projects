using Microsoft.EntityFrameworkCore;
using StudentCourseManagement.Api.Data;
using StudentCourseManagement.Api.Interfaces;
using StudentCourseManagement.Api.Models;

namespace StudentCourseManagement.Api.Repositories;

public class StudentRepository(ApplicationDbContext dbContext) : IStudentRepository
{
    public async Task<List<Student>> GetAllAsync(string? search)
    {
        var query = dbContext.Students.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLower();
            query = query.Where(student =>
                student.FullName.ToLower().Contains(term) ||
                student.Email.ToLower().Contains(term) ||
                student.Department.ToLower().Contains(term));
        }

        return await query
            .OrderByDescending(student => student.CreatedAt)
            .ThenBy(student => student.FullName)
            .ToListAsync();
    }

    public Task<Student?> GetByIdAsync(int id)
    {
        return dbContext.Students.FirstOrDefaultAsync(student => student.Id == id);
    }

    public Task<bool> EmailExistsAsync(string email, int? ignoreId = null)
    {
        var normalizedEmail = email.Trim().ToLower();
        return dbContext.Students.AnyAsync(student =>
            student.Email.ToLower() == normalizedEmail &&
            (!ignoreId.HasValue || student.Id != ignoreId.Value));
    }

    public Task<int> CountAsync()
    {
        return dbContext.Students.CountAsync();
    }

    public async Task AddAsync(Student student)
    {
        await dbContext.Students.AddAsync(student);
    }

    public void Delete(Student student)
    {
        dbContext.Students.Remove(student);
    }

    public Task SaveChangesAsync()
    {
        return dbContext.SaveChangesAsync();
    }
}
