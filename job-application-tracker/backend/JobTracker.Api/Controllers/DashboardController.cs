using System.Security.Claims;
using JobTracker.Api.Data;
using JobTracker.Api.DTOs;
using JobTracker.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobTracker.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class DashboardController(AppDbContext context) : ControllerBase
{
    [HttpGet("stats")]
    public async Task<ActionResult<DashboardDto>> GetStats()
    {
        var userId = GetUserId();
        var applications = context.JobApplications
            .AsNoTracking()
            .Where(application => application.UserId == userId);

        var stats = new DashboardDto
        {
            TotalApplications = await applications.CountAsync(),
            AppliedCount = await applications.CountAsync(application => application.Status == ApplicationStatus.Applied),
            InterviewCount = await applications.CountAsync(application => application.Status == ApplicationStatus.Interview),
            SelectedCount = await applications.CountAsync(application => application.Status == ApplicationStatus.Selected),
            RejectedCount = await applications.CountAsync(application => application.Status == ApplicationStatus.Rejected)
        };

        return Ok(stats);
    }

    private int GetUserId()
    {
        var value = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return int.TryParse(value, out var userId)
            ? userId
            : throw new UnauthorizedAccessException("Invalid user token.");
    }
}
