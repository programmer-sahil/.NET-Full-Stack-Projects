using Microsoft.EntityFrameworkCore;
using SkillTrackApi.Models;

namespace SkillTrackApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<AppUser> Users => Set<AppUser>();
    public DbSet<Course> Courses => Set<Course>();
    public DbSet<LearningTask> LearningTasks => Set<LearningTask>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<AppUser>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<Course>()
            .HasMany(c => c.Tasks)
            .WithOne(t => t.Course)
            .HasForeignKey(t => t.CourseId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<AppUser>()
            .HasMany(u => u.Tasks)
            .WithOne(t => t.User)
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}