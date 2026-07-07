using System.ComponentModel.DataAnnotations;

namespace StudentCourseManagement.Api.Models;

public class User
{
    public int Id { get; set; }

    [MaxLength(120)]
    public string FullName { get; set; } = string.Empty;

    [MaxLength(150)]
    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    [MaxLength(30)]
    public string Role { get; set; } = "Admin";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
