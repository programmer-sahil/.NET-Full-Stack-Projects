using System.ComponentModel.DataAnnotations;

namespace StudentCourseManagement.Api.DTOs;

public class StudentCreateDto
{
    [Required, MaxLength(120)]
    public string FullName { get; set; } = string.Empty;

    [Required, EmailAddress, MaxLength(150)]
    public string Email { get; set; } = string.Empty;

    [Required, MaxLength(20)]
    public string Phone { get; set; } = string.Empty;

    [Required, MaxLength(80)]
    public string Department { get; set; } = string.Empty;

    [Required]
    public DateTime DateOfBirth { get; set; }
}
