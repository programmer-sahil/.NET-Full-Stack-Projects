using StudentCourseManagement.Api.DTOs;
using StudentCourseManagement.Api.Helpers;
using StudentCourseManagement.Api.Interfaces;
using StudentCourseManagement.Api.Models;

namespace StudentCourseManagement.Api.Services;

public class CourseService(ICourseRepository courseRepository) : ICourseService
{
    public async Task<List<CourseDto>> GetAllAsync(string? search)
    {
        var courses = await courseRepository.GetAllAsync(search);
        return courses.Select(MapToDto).ToList();
    }

    public async Task<CourseDto> GetByIdAsync(int id)
    {
        var course = await courseRepository.GetByIdAsync(id)
            ?? throw new NotFoundException("Course not found.");

        return MapToDto(course);
    }

    public async Task<CourseDto> CreateAsync(CourseCreateDto dto)
    {
        if (await courseRepository.CodeExistsAsync(dto.CourseCode))
        {
            throw new BadRequestException("A course with this code already exists.");
        }

        var course = new Course
        {
            CourseCode = dto.CourseCode.Trim().ToUpper(),
            CourseTitle = dto.CourseTitle.Trim(),
            Credits = dto.Credits,
            InstructorName = dto.InstructorName.Trim(),
            Description = dto.Description.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        await courseRepository.AddAsync(course);
        await courseRepository.SaveChangesAsync();

        return MapToDto(course);
    }

    public async Task<CourseDto> UpdateAsync(int id, CourseUpdateDto dto)
    {
        var course = await courseRepository.GetByIdAsync(id)
            ?? throw new NotFoundException("Course not found.");

        if (await courseRepository.CodeExistsAsync(dto.CourseCode, id))
        {
            throw new BadRequestException("A course with this code already exists.");
        }

        course.CourseCode = dto.CourseCode.Trim().ToUpper();
        course.CourseTitle = dto.CourseTitle.Trim();
        course.Credits = dto.Credits;
        course.InstructorName = dto.InstructorName.Trim();
        course.Description = dto.Description.Trim();

        await courseRepository.SaveChangesAsync();
        return MapToDto(course);
    }

    public async Task DeleteAsync(int id)
    {
        var course = await courseRepository.GetByIdAsync(id)
            ?? throw new NotFoundException("Course not found.");

        courseRepository.Delete(course);
        await courseRepository.SaveChangesAsync();
    }

    private static CourseDto MapToDto(Course course)
    {
        return new CourseDto
        {
            Id = course.Id,
            CourseCode = course.CourseCode,
            CourseTitle = course.CourseTitle,
            Credits = course.Credits,
            InstructorName = course.InstructorName,
            Description = course.Description,
            CreatedAt = course.CreatedAt
        };
    }
}
