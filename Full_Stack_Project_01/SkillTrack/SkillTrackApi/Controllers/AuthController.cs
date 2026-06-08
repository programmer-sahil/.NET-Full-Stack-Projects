using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillTrackApi.Data;
using SkillTrackApi.DTOs;
using SkillTrackApi.Models;
using SkillTrackApi.Services;
using System.Security.Claims;

namespace SkillTrackApi.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly JwtTokenService _jwtTokenService;

    public AuthController(AppDbContext context, JwtTokenService jwtTokenService)
    {
        _context = context;
        _jwtTokenService = jwtTokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register(RegisterDto dto)
    {
        var email = dto.Email.Trim().ToLower();

        var emailExists = await _context.Users.AnyAsync(u => u.Email == email);

        if (emailExists)
        {
            return BadRequest(new { message = "Email already registered." });
        }

        var user = new AppUser
        {
            FullName = dto.FullName.Trim(),
            Email = email,
            PasswordHash = PasswordService.HashPassword(dto.Password),
            Role = "Student",
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var token = _jwtTokenService.CreateToken(user);

        return Ok(new AuthResponseDto
        {
            Token = token,
            User = new UserProfileDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role
            }
        });
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginDto dto)
    {
        var email = dto.Email.Trim().ToLower();

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

        if (user == null)
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        var isPasswordValid = PasswordService.VerifyPassword(dto.Password, user.PasswordHash);

        if (!isPasswordValid)
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        var token = _jwtTokenService.CreateToken(user);

        return Ok(new AuthResponseDto
        {
            Token = token,
            User = new UserProfileDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role
            }
        });
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<UserProfileDto>> GetCurrentUser()
    {
        var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdValue, out var userId))
        {
            return Unauthorized();
        }

        var user = await _context.Users.FindAsync(userId);

        if (user == null)
        {
            return Unauthorized();
        }

        return Ok(new UserProfileDto
        {
            Id = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            Role = user.Role
        });
    }
}