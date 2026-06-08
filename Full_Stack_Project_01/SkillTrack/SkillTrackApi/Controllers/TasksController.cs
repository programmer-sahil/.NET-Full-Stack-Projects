using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillTrackApi.Data;
using SkillTrackApi.DTOs;
using SkillTrackApi.Models;
using System.Security.Claims;

namespace SkillTrackApi.Controllers;

[ApiController]
[Authorize]
[Route("api/tasks")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    private int GetCurrentUserId()
    {
        var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return int.Parse(userIdValue!);
    }

    private bool IsAdmin()
    {
        return User.IsInRole("Admin");
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<LearningTaskReadDto>>> GetTasks(
        [FromQuery] string? status,
        [FromQuery] string? priority,
        [FromQuery] int? courseId)
    {
        var currentUserId = GetCurrentUserId();

        var query = _context.LearningTasks
            .Include(t => t.Course)
            .Include(t => t.User)
            .AsQueryable();

        if (!IsAdmin())
        {
            query = query.Where(t => t.UserId == currentUserId);
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(t => t.Status == status);
        }

        if (!string.IsNullOrWhiteSpace(priority))
        {
            query = query.Where(t => t.Priority == priority);
        }

        if (courseId.HasValue)
        {
            query = query.Where(t => t.CourseId == courseId.Value);
        }

        var tasks = await query
            .OrderByDescending(t => t.Id)
            .Select(t => new LearningTaskReadDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                Status = t.Status,
                Priority = t.Priority,
                DueDate = t.DueDate,
                CourseId = t.CourseId,
                CourseTitle = t.Course != null ? t.Course.Title : "",
                UserId = t.UserId,
                UserFullName = t.User != null ? t.User.FullName : ""
            })
            .ToListAsync();

        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<LearningTaskReadDto>> GetTask(int id)
    {
        var currentUserId = GetCurrentUserId();

        var task = await _context.LearningTasks
            .Include(t => t.Course)
            .Include(t => t.User)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (task == null)
        {
            return NotFound(new { message = "Task not found" });
        }

        if (!IsAdmin() && task.UserId != currentUserId)
        {
            return Forbid();
        }

        return Ok(new LearningTaskReadDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            Status = task.Status,
            Priority = task.Priority,
            DueDate = task.DueDate,
            CourseId = task.CourseId,
            CourseTitle = task.Course != null ? task.Course.Title : "",
            UserId = task.UserId,
            UserFullName = task.User != null ? task.User.FullName : ""
        });
    }

    [HttpPost]
    public async Task<ActionResult<LearningTaskReadDto>> CreateTask(LearningTaskCreateDto dto)
    {
        var currentUserId = GetCurrentUserId();

        var courseExists = await _context.Courses.AnyAsync(c => c.Id == dto.CourseId);

        if (!courseExists)
        {
            return BadRequest(new { message = "Invalid CourseId" });
        }

        var task = new LearningTask
        {
            Title = dto.Title,
            Description = dto.Description,
            Status = dto.Status,
            Priority = dto.Priority,
            DueDate = dto.DueDate,
            CourseId = dto.CourseId,
            UserId = currentUserId
        };

        _context.LearningTasks.Add(task);
        await _context.SaveChangesAsync();

        var savedTask = await _context.LearningTasks
            .Include(t => t.Course)
            .Include(t => t.User)
            .FirstAsync(t => t.Id == task.Id);

        var readDto = new LearningTaskReadDto
        {
            Id = savedTask.Id,
            Title = savedTask.Title,
            Description = savedTask.Description,
            Status = savedTask.Status,
            Priority = savedTask.Priority,
            DueDate = savedTask.DueDate,
            CourseId = savedTask.CourseId,
            CourseTitle = savedTask.Course != null ? savedTask.Course.Title : "",
            UserId = savedTask.UserId,
            UserFullName = savedTask.User != null ? savedTask.User.FullName : ""
        };

        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, readDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, LearningTaskUpdateDto dto)
    {
        var currentUserId = GetCurrentUserId();

        var task = await _context.LearningTasks.FindAsync(id);

        if (task == null)
        {
            return NotFound(new { message = "Task not found" });
        }

        if (!IsAdmin() && task.UserId != currentUserId)
        {
            return Forbid();
        }

        var courseExists = await _context.Courses.AnyAsync(c => c.Id == dto.CourseId);

        if (!courseExists)
        {
            return BadRequest(new { message = "Invalid CourseId" });
        }

        task.Title = dto.Title;
        task.Description = dto.Description;
        task.Status = dto.Status;
        task.Priority = dto.Priority;
        task.DueDate = dto.DueDate;
        task.CourseId = dto.CourseId;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var currentUserId = GetCurrentUserId();

        var task = await _context.LearningTasks.FindAsync(id);

        if (task == null)
        {
            return NotFound(new { message = "Task not found" });
        }

        if (!IsAdmin() && task.UserId != currentUserId)
        {
            return Forbid();
        }

        _context.LearningTasks.Remove(task);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}