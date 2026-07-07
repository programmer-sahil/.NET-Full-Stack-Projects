using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentCourseManagement.Api.DTOs;
using StudentCourseManagement.Api.Interfaces;

namespace StudentCourseManagement.Api.Controllers;

[ApiController]
[Authorize(Roles = "Admin")]
[Route("api/[controller]")]
public class CoursesController(ICourseService courseService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<CourseDto>>> GetAll([FromQuery] string? search)
    {
        var courses = await courseService.GetAllAsync(search);
        return Ok(courses);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<CourseDto>> GetById(int id)
    {
        var course = await courseService.GetByIdAsync(id);
        return Ok(course);
    }

    [HttpPost]
    public async Task<ActionResult<CourseDto>> Create(CourseCreateDto dto)
    {
        var course = await courseService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = course.Id }, course);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<CourseDto>> Update(int id, CourseUpdateDto dto)
    {
        var course = await courseService.UpdateAsync(id, dto);
        return Ok(course);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await courseService.DeleteAsync(id);
        return NoContent();
    }
}
