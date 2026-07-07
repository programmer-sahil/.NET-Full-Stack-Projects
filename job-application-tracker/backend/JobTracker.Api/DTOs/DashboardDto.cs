namespace JobTracker.Api.DTOs;

public class DashboardDto
{
    public int TotalApplications { get; set; }

    public int AppliedCount { get; set; }

    public int InterviewCount { get; set; }

    public int SelectedCount { get; set; }

    public int RejectedCount { get; set; }
}
