class PartTimeEmployee : Employee
{
    public int WorkingHours { get; set; }

    public PartTimeEmployee(int id, string name, int age, string department, decimal salary, int workingHours)
        : base(id, name, age, department, salary)
    {
        WorkingHours = workingHours;
    }

    public override decimal CalculateBonus()
    {
        return Salary * 0.02m;
    }

    public override void DisplayInfo()
    {
        base.DisplayInfo();
        Console.WriteLine($"Employee Type: Part Time");
        Console.WriteLine($"Working Hours: {WorkingHours}");
    }
}