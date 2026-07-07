using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentCourseManagement.Api.DTOs;
using StudentCourseManagement.Api.Interfaces;

namespace StudentCourseManagement.Api.Controllers;

[ApiController]
[Authorize(Roles = "Admin")]
[Route("api/[controller]")]
public class EnrollmentsController(IEnrollmentService enrollmentService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<EnrollmentDto>>> GetAll()
    {
        var enrollments = await enrollmentService.GetAllAsync();
        return Ok(enrollments);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<EnrollmentDto>> GetById(int id)
    {
        var enrollment = await enrollmentService.GetByIdAsync(id);
        return Ok(enrollment);
    }

    [HttpPost]
    public async Task<ActionResult<EnrollmentDto>> Create(EnrollmentCreateDto dto)
    {
        var enrollment = await enrollmentService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = enrollment.Id }, enrollment);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<EnrollmentDto>> Update(int id, EnrollmentUpdateDto dto)
    {
        var enrollment = await enrollmentService.UpdateAsync(id, dto);
        return Ok(enrollment);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await enrollmentService.DeleteAsync(id);
        return NoContent();
    }
}
