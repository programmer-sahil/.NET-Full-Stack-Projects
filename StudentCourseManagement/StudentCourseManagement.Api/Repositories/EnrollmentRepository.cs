using Microsoft.EntityFrameworkCore;
using StudentCourseManagement.Api.Data;
using StudentCourseManagement.Api.Interfaces;
using StudentCourseManagement.Api.Models;

namespace StudentCourseManagement.Api.Repositories;

public class EnrollmentRepository(ApplicationDbContext dbContext) : IEnrollmentRepository
{
    public Task<List<Enrollment>> GetAllAsync()
    {
        return dbContext.Enrollments
            .AsNoTracking()
            .Include(enrollment => enrollment.Student)
            .Include(enrollment => enrollment.Course)
            .OrderByDescending(enrollment => enrollment.EnrollmentDate)
            .ToListAsync();
    }

    public Task<List<Enrollment>> GetRecentAsync(int count)
    {
        return dbContext.Enrollments
            .AsNoTracking()
            .Include(enrollment => enrollment.Student)
            .Include(enrollment => enrollment.Course)
            .OrderByDescending(enrollment => enrollment.EnrollmentDate)
            .Take(count)
            .ToListAsync();
    }

    public Task<Enrollment?> GetByIdAsync(int id)
    {
        return dbContext.Enrollments
            .Include(enrollment => enrollment.Student)
            .Include(enrollment => enrollment.Course)
            .FirstOrDefaultAsync(enrollment => enrollment.Id == id);
    }

    public Task<bool> ExistsAsync(int studentId, int courseId, int? ignoreId = null)
    {
        return dbContext.Enrollments.AnyAsync(enrollment =>
            enrollment.StudentId == studentId &&
            enrollment.CourseId == courseId &&
            (!ignoreId.HasValue || enrollment.Id != ignoreId.Value));
    }

    public Task<int> CountAsync()
    {
        return dbContext.Enrollments.CountAsync();
    }

    public async Task AddAsync(Enrollment enrollment)
    {
        await dbContext.Enrollments.AddAsync(enrollment);
    }

    public void Delete(Enrollment enrollment)
    {
        dbContext.Enrollments.Remove(enrollment);
    }

    public Task SaveChangesAsync()
    {
        return dbContext.SaveChangesAsync();
    }
}
