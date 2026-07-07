using System.ComponentModel.DataAnnotations;

namespace JobTracker.Api.DTOs;

public class JobApplicationUpdateDto
{
    [Required]
    [StringLength(120)]
    public string CompanyName { get; set; } = string.Empty;

    [Required]
    [StringLength(120)]
    public string JobRole { get; set; } = string.Empty;

    [Required]
    [StringLength(120)]
    public string Location { get; set; } = string.Empty;

    [Required]
    [StringLength(80)]
    public string JobType { get; set; } = string.Empty;

    [Required]
    public DateTime ApplicationDate { get; set; }

    [Required]
    public string Status { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? Notes { get; set; }

    [StringLength(500)]
    public string? JobLink { get; set; }
}
