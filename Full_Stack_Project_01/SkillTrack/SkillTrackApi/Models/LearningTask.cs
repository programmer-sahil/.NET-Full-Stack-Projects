using System.ComponentModel.DataAnnotations;

namespace SkillTrackApi.Models;

public class LearningTask
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;

    [MaxLength(30)]
    public string Status { get; set; } = "Pending";

    [MaxLength(30)]
    public string Priority { get; set; } = "Medium";

    public DateTime? DueDate { get; set; }

    public int CourseId { get; set; }

    public Course? Course { get; set; }

    public int UserId { get; set; }

    public AppUser? User { get; set; }
}