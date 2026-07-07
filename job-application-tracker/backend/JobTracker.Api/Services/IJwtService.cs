using JobTracker.Api.Models;

namespace JobTracker.Api.Services;

public interface IJwtService
{
    string GenerateToken(User user);
}
