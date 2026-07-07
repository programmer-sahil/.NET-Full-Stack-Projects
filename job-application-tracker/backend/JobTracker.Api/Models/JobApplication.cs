using System.ComponentModel.DataAnnotations;

namespace JobTracker.Api.Models;

public class JobApplication
{
    public int Id { get; set; }

    [Required]
    [MaxLength(120)]
    public string CompanyName { get; set; } = string.Empty;

    [Required]
    [MaxLength(120)]
    public string JobRole { get; set; } = string.Empty;

    [Required]
    [MaxLength(120)]
    public string Location { get; set; } = string.Empty;

    [Required]
    [MaxLength(80)]
    public string JobType { get; set; } = string.Empty;

    public DateTime ApplicationDate { get; set; }

    public ApplicationStatus Status { get; set; } = ApplicationStatus.Applied;

    [MaxLength(1000)]
    public string? Notes { get; set; }

    [MaxLength(500)]
    public string? JobLink { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }

    public int UserId { get; set; }

    public User? User { get; set; }
}
