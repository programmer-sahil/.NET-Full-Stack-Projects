namespace SkillTrackApi.DTOs;

public class CourseReadDto
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;

    public int DurationHours { get; set; }

    public int TaskCount { get; set; }

    public DateTime CreatedAt { get; set; }
}