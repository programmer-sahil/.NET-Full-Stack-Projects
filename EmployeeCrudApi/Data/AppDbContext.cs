using EmployeeCrudApi.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeCrudApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Employee> Employees { get; set; }
}