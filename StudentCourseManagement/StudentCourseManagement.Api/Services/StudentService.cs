using StudentCourseManagement.Api.DTOs;
using StudentCourseManagement.Api.Helpers;
using StudentCourseManagement.Api.Interfaces;
using StudentCourseManagement.Api.Models;

namespace StudentCourseManagement.Api.Services;

public class StudentService(IStudentRepository studentRepository) : IStudentService
{
    public async Task<List<StudentDto>> GetAllAsync(string? search)
    {
        var students = await studentRepository.GetAllAsync(search);
        return students.Select(MapToDto).ToList();
    }

    public async Task<StudentDto> GetByIdAsync(int id)
    {
        var student = await studentRepository.GetByIdAsync(id)
            ?? throw new NotFoundException("Student not found.");

        return MapToDto(student);
    }

    public async Task<StudentDto> CreateAsync(StudentCreateDto dto)
    {
        if (await studentRepository.EmailExistsAsync(dto.Email))
        {
            throw new BadRequestException("A student with this email already exists.");
        }

        var student = new Student
        {
            FullName = dto.FullName.Trim(),
            Email = dto.Email.Trim().ToLower(),
            Phone = dto.Phone.Trim(),
            Department = dto.Department.Trim(),
            DateOfBirth = dto.DateOfBirth,
            CreatedAt = DateTime.UtcNow
        };

        await studentRepository.AddAsync(student);
        await studentRepository.SaveChangesAsync();

        return MapToDto(student);
    }

    public async Task<StudentDto> UpdateAsync(int id, StudentUpdateDto dto)
    {
        var student = await studentRepository.GetByIdAsync(id)
            ?? throw new NotFoundException("Student not found.");

        if (await studentRepository.EmailExistsAsync(dto.Email, id))
        {
            throw new BadRequestException("A student with this email already exists.");
        }

        student.FullName = dto.FullName.Trim();
        student.Email = dto.Email.Trim().ToLower();
        student.Phone = dto.Phone.Trim();
        student.Department = dto.Department.Trim();
        student.DateOfBirth = dto.DateOfBirth;

        await studentRepository.SaveChangesAsync();
        return MapToDto(student);
    }

    public async Task DeleteAsync(int id)
    {
        var student = await studentRepository.GetByIdAsync(id)
            ?? throw new NotFoundException("Student not found.");

        studentRepository.Delete(student);
        await studentRepository.SaveChangesAsync();
    }

    private static StudentDto MapToDto(Student student)
    {
        return new StudentDto
        {
            Id = student.Id,
            FullName = student.FullName,
            Email = student.Email,
            Phone = student.Phone,
            Department = student.Department,
            DateOfBirth = student.DateOfBirth,
            CreatedAt = student.CreatedAt
        };
    }
}
