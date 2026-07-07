using JobTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace JobTracker.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();

    public DbSet<JobApplication> JobApplications => Set<JobApplication>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(user => user.Email).IsUnique();
            entity.Property(user => user.Email).IsRequired().HasMaxLength(160);
            entity.Property(user => user.FullName).IsRequired().HasMaxLength(100);

            entity.HasMany(user => user.Applications)
                .WithOne(application => application.User)
                .HasForeignKey(application => application.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<JobApplication>(entity =>
        {
            entity.Property(application => application.CompanyName).IsRequired().HasMaxLength(120);
            entity.Property(application => application.JobRole).IsRequired().HasMaxLength(120);
            entity.Property(application => application.Location).IsRequired().HasMaxLength(120);
            entity.Property(application => application.JobType).IsRequired().HasMaxLength(80);
            entity.Property(application => application.Status)
                .HasConversion<string>()
                .HasMaxLength(30);
            entity.Property(application => application.JobLink).HasMaxLength(500);
            entity.Property(application => application.Notes).HasMaxLength(1000);
        });
    }
}
