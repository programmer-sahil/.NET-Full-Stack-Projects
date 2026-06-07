using EmployeeCrudApi.Data;
using EmployeeCrudApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeCrudApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly AppDbContext _context;

    public EmployeesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: /api/employees
    [HttpGet]
    public async Task<ActionResult<List<Employee>>> GetEmployees()
    {
        List<Employee> employees = await _context.Employees.ToListAsync();

        return Ok(employees);
    }

    // GET: /api/employees/1
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

    // POST: /api/employees
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

        if (string.IsNullOrWhiteSpace(employee.Email))
        {
            return BadRequest(new { message = "Email is required" });
        }

        _context.Employees.Add(employee);

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.Id }, employee);
    }

    // PUT: /api/employees/1
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

        if (string.IsNullOrWhiteSpace(updatedEmployee.Email))
        {
            return BadRequest(new { message = "Email is required" });
        }

        existingEmployee.Name = updatedEmployee.Name;
        existingEmployee.Department = updatedEmployee.Department;
        existingEmployee.Salary = updatedEmployee.Salary;
        existingEmployee.Email = updatedEmployee.Email;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: /api/employees/1
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