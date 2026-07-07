using Microsoft.EntityFrameworkCore;
using StudentCourseManagement.Api.Helpers;
using StudentCourseManagement.Api.Models;

namespace StudentCourseManagement.Api.Data;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        await dbContext.Database.MigrateAsync();

        const string adminEmail = "admin@studentcms.com";
        var adminExists = await dbContext.Users.AnyAsync(user => user.Email == adminEmail);

        if (adminExists)
        {
            return;
        }

        dbContext.Users.Add(new User
        {
            FullName = "System Admin",
            Email = adminEmail,
            PasswordHash = PasswordHelper.HashPassword("Admin@123"),
            Role = "Admin",
            CreatedAt = DateTime.UtcNow
        });

        await dbContext.SaveChangesAsync();
    }
}
