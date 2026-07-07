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
public class ApplicationsController(AppDbContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<JobApplicationDto>>> GetApplications()
    {
        var userId = GetUserId();
        var applications = await context.JobApplications
            .AsNoTracking()
            .Where(application => application.UserId == userId)
            .OrderByDescending(application => application.ApplicationDate)
            .ThenByDescending(application => application.CreatedAt)
            .Select(application => ToDto(application))
            .ToListAsync();

        return Ok(applications);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<JobApplicationDto>> GetApplication(int id)
    {
        var userId = GetUserId();
        var application = await context.JobApplications
            .AsNoTracking()
            .SingleOrDefaultAsync(application => application.Id == id && application.UserId == userId);

        return application is null ? NotFound(new { message = "Application not found." }) : Ok(ToDto(application));
    }

    [HttpPost]
    public async Task<ActionResult<JobApplicationDto>> CreateApplication(JobApplicationCreateDto request)
    {
        if (HasBlankRequiredFields(request.CompanyName, request.JobRole, request.Location, request.JobType))
        {
            return BadRequest(new { message = "Company name, job role, location, and job type are required." });
        }

        if (!TryParseStatus(request.Status, out var status))
        {
            return BadRequest(new { message = "Status must be Applied, Interview, Selected, or Rejected." });
        }

        var application = new JobApplication
        {
            CompanyName = request.CompanyName.Trim(),
            JobRole = request.JobRole.Trim(),
            Location = request.Location.Trim(),
            JobType = request.JobType.Trim(),
            ApplicationDate = request.ApplicationDate.Date,
            Status = status,
            Notes = NormalizeOptionalText(request.Notes),
            JobLink = NormalizeOptionalText(request.JobLink),
            UserId = GetUserId(),
            CreatedAt = DateTime.UtcNow
        };

        context.JobApplications.Add(application);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetApplication), new { id = application.Id }, ToDto(application));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<JobApplicationDto>> UpdateApplication(int id, JobApplicationUpdateDto request)
    {
        if (HasBlankRequiredFields(request.CompanyName, request.JobRole, request.Location, request.JobType))
        {
            return BadRequest(new { message = "Company name, job role, location, and job type are required." });
        }

        if (!TryParseStatus(request.Status, out var status))
        {
            return BadRequest(new { message = "Status must be Applied, Interview, Selected, or Rejected." });
        }

        var userId = GetUserId();
        var application = await context.JobApplications
            .SingleOrDefaultAsync(application => application.Id == id && application.UserId == userId);

        if (application is null)
        {
            return NotFound(new { message = "Application not found." });
        }

        application.CompanyName = request.CompanyName.Trim();
        application.JobRole = request.JobRole.Trim();
        application.Location = request.Location.Trim();
        application.JobType = request.JobType.Trim();
        application.ApplicationDate = request.ApplicationDate.Date;
        application.Status = status;
        application.Notes = NormalizeOptionalText(request.Notes);
        application.JobLink = NormalizeOptionalText(request.JobLink);
        application.UpdatedAt = DateTime.UtcNow;

        await context.SaveChangesAsync();

        return Ok(ToDto(application));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteApplication(int id)
    {
        var userId = GetUserId();
        var application = await context.JobApplications
            .SingleOrDefaultAsync(application => application.Id == id && application.UserId == userId);

        if (application is null)
        {
            return NotFound(new { message = "Application not found." });
        }

        context.JobApplications.Remove(application);
        await context.SaveChangesAsync();

        return NoContent();
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<JobApplicationDto>>> SearchApplications([FromQuery] string? query, [FromQuery] string? status)
    {
        var userId = GetUserId();
        var applicationsQuery = context.JobApplications
            .AsNoTracking()
            .Where(application => application.UserId == userId);

        if (!string.IsNullOrWhiteSpace(query))
        {
            var keyword = query.Trim().ToLowerInvariant();
            applicationsQuery = applicationsQuery.Where(application =>
                application.CompanyName.ToLower().Contains(keyword) ||
                application.JobRole.ToLower().Contains(keyword) ||
                application.Location.ToLower().Contains(keyword) ||
                application.JobType.ToLower().Contains(keyword));
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            if (!TryParseStatus(status, out var parsedStatus))
            {
                return BadRequest(new { message = "Status must be Applied, Interview, Selected, or Rejected." });
            }

            applicationsQuery = applicationsQuery.Where(application => application.Status == parsedStatus);
        }

        var applications = await applicationsQuery
            .OrderByDescending(application => application.ApplicationDate)
            .ThenByDescending(application => application.CreatedAt)
            .Select(application => ToDto(application))
            .ToListAsync();

        return Ok(applications);
    }

    private int GetUserId()
    {
        var value = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return int.TryParse(value, out var userId)
            ? userId
            : throw new UnauthorizedAccessException("Invalid user token.");
    }

    private static bool TryParseStatus(string status, out ApplicationStatus applicationStatus) =>
        Enum.TryParse(status.Trim(), ignoreCase: true, out applicationStatus) &&
        Enum.IsDefined(applicationStatus);

    private static bool HasBlankRequiredFields(params string[] values) =>
        values.Any(string.IsNullOrWhiteSpace);

    private static string? NormalizeOptionalText(string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : value.Trim();

    private static JobApplicationDto ToDto(JobApplication application) => new()
    {
        Id = application.Id,
        CompanyName = application.CompanyName,
        JobRole = application.JobRole,
        Location = application.Location,
        JobType = application.JobType,
        ApplicationDate = application.ApplicationDate,
        Status = application.Status,
        Notes = application.Notes,
        JobLink = application.JobLink,
        CreatedAt = application.CreatedAt,
        UpdatedAt = application.UpdatedAt
    };
}
