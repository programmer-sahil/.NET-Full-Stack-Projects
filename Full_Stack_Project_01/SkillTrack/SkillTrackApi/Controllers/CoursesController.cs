using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillTrackApi.Data;
using SkillTrackApi.DTOs;
using SkillTrackApi.Models;

namespace SkillTrackApi.Controllers;

[ApiController]
[Authorize]
[Route("api/courses")]
public class CoursesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CoursesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CourseReadDto>>> GetCourses()
    {
        var courses = await _context.Courses
            .OrderByDescending(c => c.Id)
            .Select(c => new CourseReadDto
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,
                Category = c.Category,
                DurationHours = c.DurationHours,
                TaskCount = c.Tasks.Count,
                CreatedAt = c.CreatedAt
            })
            .ToListAsync();

        return Ok(courses);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CourseReadDto>> GetCourse(int id)
    {
        var course = await _context.Courses
            .Where(c => c.Id == id)
            .Select(c => new CourseReadDto
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,
                Category = c.Category,
                DurationHours = c.DurationHours,
                TaskCount = c.Tasks.Count,
                CreatedAt = c.CreatedAt
            })
            .FirstOrDefaultAsync();

        if (course == null)
        {
            return NotFound(new { message = "Course not found" });
        }

        return Ok(course);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<CourseReadDto>> CreateCourse(CourseCreateDto dto)
    {
        var course = new Course
        {
            Title = dto.Title,
            Description = dto.Description,
            Category = dto.Category,
            DurationHours = dto.DurationHours,
            CreatedAt = DateTime.UtcNow
        };

        _context.Courses.Add(course);
        await _context.SaveChangesAsync();

        var readDto = new CourseReadDto
        {
            Id = course.Id,
            Title = course.Title,
            Description = course.Description,
            Category = course.Category,
            DurationHours = course.DurationHours,
            TaskCount = 0,
            CreatedAt = course.CreatedAt
        };

        return CreatedAtAction(nameof(GetCourse), new { id = course.Id }, readDto);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCourse(int id, CourseUpdateDto dto)
    {
        var course = await _context.Courses.FindAsync(id);

        if (course == null)
        {
            return NotFound(new { message = "Course not found" });
        }

        course.Title = dto.Title;
        course.Description = dto.Description;
        course.Category = dto.Category;
        course.DurationHours = dto.DurationHours;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCourse(int id)
    {
        var course = await _context.Courses.FindAsync(id);

        if (course == null)
        {
            return NotFound(new { message = "Course not found" });
        }

        _context.Courses.Remove(course);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}