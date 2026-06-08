using System.ComponentModel.DataAnnotations;

namespace SkillTrackApi.Models;

public class Course
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;

    [MaxLength(50)]
    public string Category { get; set; } = string.Empty;

    public int DurationHours { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public List<LearningTask> Tasks { get; set; } = new();
}