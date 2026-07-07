using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentCourseManagement.Api.DTOs;
using StudentCourseManagement.Api.Interfaces;

namespace StudentCourseManagement.Api.Controllers;

[ApiController]
[Authorize(Roles = "Admin")]
[Route("api/[controller]")]
public class StudentsController(IStudentService studentService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<StudentDto>>> GetAll([FromQuery] string? search)
    {
        var students = await studentService.GetAllAsync(search);
        return Ok(students);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<StudentDto>> GetById(int id)
    {
        var student = await studentService.GetByIdAsync(id);
        return Ok(student);
    }

    [HttpPost]
    public async Task<ActionResult<StudentDto>> Create(StudentCreateDto dto)
    {
        var student = await studentService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = student.Id }, student);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<StudentDto>> Update(int id, StudentUpdateDto dto)
    {
        var student = await studentService.UpdateAsync(id, dto);
        return Ok(student);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await studentService.DeleteAsync(id);
        return NoContent();
    }
}
