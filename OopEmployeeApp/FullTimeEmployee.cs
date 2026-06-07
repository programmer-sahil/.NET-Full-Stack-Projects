class FullTimeEmployee : Employee
{
    public int PaidLeaves { get; set; }

    public FullTimeEmployee(int id, string name, int age, string department, decimal salary, int paidLeaves)
        : base(id, name, age, department, salary)
    {
        PaidLeaves = paidLeaves;
    }

    public override decimal CalculateBonus()
    {
        return Salary * 0.10m;
    }

    public override void DisplayInfo()
    {
        base.DisplayInfo();
        Console.WriteLine($"Employee Type: Full Time");
        Console.WriteLine($"Paid Leaves: {PaidLeaves}");
    }
}