using System.ComponentModel.DataAnnotations;

namespace SkillTrackApi.DTOs;

public class LearningTaskUpdateDto
{
    [Required]
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Status { get; set; } = "Pending";

    public string Priority { get; set; } = "Medium";

    public DateTime? DueDate { get; set; }

    public int CourseId { get; set; }
}