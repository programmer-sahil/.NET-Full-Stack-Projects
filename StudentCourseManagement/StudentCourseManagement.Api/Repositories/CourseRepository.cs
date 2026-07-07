using Microsoft.EntityFrameworkCore;
using StudentCourseManagement.Api.Data;
using StudentCourseManagement.Api.Interfaces;
using StudentCourseManagement.Api.Models;

namespace StudentCourseManagement.Api.Repositories;

public class CourseRepository(ApplicationDbContext dbContext) : ICourseRepository
{
    public async Task<List<Course>> GetAllAsync(string? search)
    {
        var query = dbContext.Courses.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLower();
            query = query.Where(course =>
                course.CourseTitle.ToLower().Contains(term) ||
                course.CourseCode.ToLower().Contains(term));
        }

        return await query
            .OrderByDescending(course => course.CreatedAt)
            .ThenBy(course => course.CourseCode)
            .ToListAsync();
    }

    public Task<Course?> GetByIdAsync(int id)
    {
        return dbContext.Courses.FirstOrDefaultAsync(course => course.Id == id);
    }

    public Task<bool> CodeExistsAsync(string courseCode, int? ignoreId = null)
    {
        var normalizedCode = courseCode.Trim().ToLower();
        return dbContext.Courses.AnyAsync(course =>
            course.CourseCode.ToLower() == normalizedCode &&
            (!ignoreId.HasValue || course.Id != ignoreId.Value));
    }

    public Task<int> CountAsync()
    {
        return dbContext.Courses.CountAsync();
    }

    public async Task AddAsync(Course course)
    {
        await dbContext.Courses.AddAsync(course);
    }

    public void Delete(Course course)
    {
        dbContext.Courses.Remove(course);
    }

    public Task SaveChangesAsync()
    {
        return dbContext.SaveChangesAsync();
    }
}
