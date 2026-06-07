using EmployeeEfApi.Data;
using EmployeeEfApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeEfApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly AppDbContext _context;

    public EmployeesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Employee>>> GetEmployees()
    {
        List<Employee> employees = await _context.Employees.ToListAsync();

        return Ok(employees);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Employee>> GetEmployeeById(int id)
    {
        Employee? employee = await _context.Employees.FindAsync(id);

        if (employee == null)
        {
            return NotFound(new { message = "Employee not found" });
        }

        return Ok(employee);
    }

    [HttpPost]
    public async Task<ActionResult<Employee>> AddEmployee(Employee employee)
    {
        if (string.IsNullOrWhiteSpace(employee.Name))
        {
            return BadRequest(new { message = "Employee name is required" });
        }

        if (string.IsNullOrWhiteSpace(employee.Department))
        {
            return BadRequest(new { message = "Department is required" });
        }

        if (employee.Salary <= 0)
        {
            return BadRequest(new { message = "Salary must be greater than 0" });
        }

        _context.Employees.Add(employee);

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.Id }, employee);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployee(int id, Employee updatedEmployee)
    {
        if (id != updatedEmployee.Id)
        {
            return BadRequest(new { message = "ID in URL and body do not match" });
        }

        Employee? existingEmployee = await _context.Employees.FindAsync(id);

        if (existingEmployee == null)
        {
            return NotFound(new { message = "Employee not found" });
        }

        if (string.IsNullOrWhiteSpace(updatedEmployee.Name))
        {
            return BadRequest(new { message = "Employee name is required" });
        }

        if (string.IsNullOrWhiteSpace(updatedEmployee.Department))
        {
            return BadRequest(new { message = "Department is required" });
        }

        if (updatedEmployee.Salary <= 0)
        {
            return BadRequest(new { message = "Salary must be greater than 0" });
        }

        existingEmployee.Name = updatedEmployee.Name;
        existingEmployee.Department = updatedEmployee.Department;
        existingEmployee.Salary = updatedEmployee.Salary;
        existingEmployee.Email = updatedEmployee.Email;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(int id)
    {
        Employee? employee = await _context.Employees.FindAsync(id);

        if (employee == null)
        {
            return NotFound(new { message = "Employee not found" });
        }

        _context.Employees.Remove(employee);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}