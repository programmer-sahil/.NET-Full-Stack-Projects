namespace SkillTrackApi.DTOs;

public class LearningTaskReadDto
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public string Priority { get; set; } = string.Empty;

    public DateTime? DueDate { get; set; }

    public int CourseId { get; set; }

    public string CourseTitle { get; set; } = string.Empty;

    public int UserId { get; set; }

    public string UserFullName { get; set; } = string.Empty;
}