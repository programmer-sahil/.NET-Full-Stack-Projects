using System.ComponentModel.DataAnnotations;

namespace SkillTrackApi.DTOs;

public class CourseCreateDto
{
    [Required]
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;

    public int DurationHours { get; set; }
}