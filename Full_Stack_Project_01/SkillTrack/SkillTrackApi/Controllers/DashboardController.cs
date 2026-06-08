using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillTrackApi.Data;
using System.Security.Claims;

namespace SkillTrackApi.Controllers;

[ApiController]
[Authorize]
[Route("api/dashboard")]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;

    public DashboardController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary()
    {
        var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdValue, out var currentUserId))
        {
            return Unauthorized();
        }

        var isAdmin = User.IsInRole("Admin");

        var taskQuery = _context.LearningTasks.AsQueryable();

        if (!isAdmin)
        {
            taskQuery = taskQuery.Where(t => t.UserId == currentUserId);
        }

        var totalCourses = await _context.Courses.CountAsync();
        var totalUsers = isAdmin ? await _context.Users.CountAsync() : 0;
        var totalTasks = await taskQuery.CountAsync();
        var completedTasks = await taskQuery.CountAsync(t => t.Status == "Completed");
        var pendingTasks = await taskQuery.CountAsync(t => t.Status == "Pending");
        var inProgressTasks = await taskQuery.CountAsync(t => t.Status == "In Progress");
        var highPriorityTasks = await taskQuery.CountAsync(t => t.Priority == "High");

        var progressPercentage = totalTasks == 0
            ? 0
            : Math.Round((completedTasks * 100.0) / totalTasks, 2);

        return Ok(new
        {
            role = isAdmin ? "Admin" : "Student",
            totalUsers,
            totalCourses,
            totalTasks,
            completedTasks,
            pendingTasks,
            inProgressTasks,
            highPriorityTasks,
            progressPercentage
        });
    }
}