using StudentCourseManagement.Api.DTOs;
using StudentCourseManagement.Api.Helpers;
using StudentCourseManagement.Api.Interfaces;
using StudentCourseManagement.Api.Models;

namespace StudentCourseManagement.Api.Services;

public class EnrollmentService(
    IEnrollmentRepository enrollmentRepository,
    IStudentRepository studentRepository,
    ICourseRepository courseRepository) : IEnrollmentService
{
    public async Task<List<EnrollmentDto>> GetAllAsync()
    {
        var enrollments = await enrollmentRepository.GetAllAsync();
        return enrollments.Select(MapToDto).ToList();
    }

    public async Task<EnrollmentDto> GetByIdAsync(int id)
    {
        var enrollment = await enrollmentRepository.GetByIdAsync(id)
            ?? throw new NotFoundException("Enrollment not found.");

        return MapToDto(enrollment);
    }

    public async Task<EnrollmentDto> CreateAsync(EnrollmentCreateDto dto)
    {
        await EnsureStudentAndCourseExistAsync(dto.StudentId, dto.CourseId);

        if (await enrollmentRepository.ExistsAsync(dto.StudentId, dto.CourseId))
        {
            throw new BadRequestException("This student is already enrolled in the selected course.");
        }

        var enrollment = new Enrollment
        {
            StudentId = dto.StudentId,
            CourseId = dto.CourseId,
            Grade = string.IsNullOrWhiteSpace(dto.Grade) ? null : dto.Grade.Trim(),
            EnrollmentDate = DateTime.UtcNow
        };

        await enrollmentRepository.AddAsync(enrollment);
        await enrollmentRepository.SaveChangesAsync();

        var createdEnrollment = await enrollmentRepository.GetByIdAsync(enrollment.Id)
            ?? throw new NotFoundException("Enrollment not found.");

        return MapToDto(createdEnrollment);
    }

    public async Task<EnrollmentDto> UpdateAsync(int id, EnrollmentUpdateDto dto)
    {
        var enrollment = await enrollmentRepository.GetByIdAsync(id)
            ?? throw new NotFoundException("Enrollment not found.");

        await EnsureStudentAndCourseExistAsync(dto.StudentId, dto.CourseId);

        if (await enrollmentRepository.ExistsAsync(dto.StudentId, dto.CourseId, id))
        {
            throw new BadRequestException("This student is already enrolled in the selected course.");
        }

        enrollment.StudentId = dto.StudentId;
        enrollment.CourseId = dto.CourseId;
        enrollment.Grade = string.IsNullOrWhiteSpace(dto.Grade) ? null : dto.Grade.Trim();

        await enrollmentRepository.SaveChangesAsync();

        var updatedEnrollment = await enrollmentRepository.GetByIdAsync(id)
            ?? throw new NotFoundException("Enrollment not found.");

        return MapToDto(updatedEnrollment);
    }

    public async Task DeleteAsync(int id)
    {
        var enrollment = await enrollmentRepository.GetByIdAsync(id)
            ?? throw new NotFoundException("Enrollment not found.");

        enrollmentRepository.Delete(enrollment);
        await enrollmentRepository.SaveChangesAsync();
    }

    private async Task EnsureStudentAndCourseExistAsync(int studentId, int courseId)
    {
        _ = await studentRepository.GetByIdAsync(studentId)
            ?? throw new BadRequestException("Selected student does not exist.");

        _ = await courseRepository.GetByIdAsync(courseId)
            ?? throw new BadRequestException("Selected course does not exist.");
    }

    private static EnrollmentDto MapToDto(Enrollment enrollment)
    {
        return new EnrollmentDto
        {
            Id = enrollment.Id,
            StudentId = enrollment.StudentId,
            StudentName = enrollment.Student?.FullName ?? string.Empty,
            CourseId = enrollment.CourseId,
            CourseTitle = enrollment.Course?.CourseTitle ?? string.Empty,
            CourseCode = enrollment.Course?.CourseCode ?? string.Empty,
            EnrollmentDate = enrollment.EnrollmentDate,
            Grade = enrollment.Grade
        };
    }
}
