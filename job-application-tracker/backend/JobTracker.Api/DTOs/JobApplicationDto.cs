using JobTracker.Api.Models;

namespace JobTracker.Api.DTOs;

public class JobApplicationDto
{
    public int Id { get; set; }

    public string CompanyName { get; set; } = string.Empty;

    public string JobRole { get; set; } = string.Empty;

    public string Location { get; set; } = string.Empty;

    public string JobType { get; set; } = string.Empty;

    public DateTime ApplicationDate { get; set; }

    public ApplicationStatus Status { get; set; }

    public string? Notes { get; set; }

    public string? JobLink { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
}
