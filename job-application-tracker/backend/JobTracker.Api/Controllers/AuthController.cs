using JobTracker.Api.Data;
using JobTracker.Api.DTOs;
using JobTracker.Api.Models;
using JobTracker.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(AppDbContext context, IJwtService jwtService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register(RegisterDto request)
    {
        if (string.IsNullOrWhiteSpace(request.FullName) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new { message = "Full name and password are required." });
        }

        var email = request.Email.Trim().ToLowerInvariant();

        if (await context.Users.AnyAsync(user => user.Email == email))
        {
            return Conflict(new { message = "Email is already registered." });
        }

        var user = new User
        {
            FullName = request.FullName.Trim(),
            Email = email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            CreatedAt = DateTime.UtcNow
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        var response = new AuthResponseDto
        {
            Token = jwtService.GenerateToken(user),
            FullName = user.FullName,
            Email = user.Email
        };

        return StatusCode(StatusCodes.Status201Created, response);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginDto request)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var user = await context.Users.SingleOrDefaultAsync(user => user.Email == email);

        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        return Ok(new AuthResponseDto
        {
            Token = jwtService.GenerateToken(user),
            FullName = user.FullName,
            Email = user.Email
        });
    }
}
