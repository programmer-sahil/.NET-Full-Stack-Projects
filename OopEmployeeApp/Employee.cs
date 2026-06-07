class Employee : Person, IWork
{
    private decimal salary;

    public string Department { get; set; }

    public decimal Salary
    {
        get
        {
            return salary;
        }
        set
        {
            if (value < 0)
            {
                salary = 0;
            }
            else
            {
                salary = value;
            }
        }
    }

    public Employee(int id, string name, int age, string department, decimal salary)
        : base(id, name, age)
    {
        Department = department;
        Salary = salary;
    }

    public override void DisplayInfo()
    {
        Console.WriteLine($"ID: {Id}");
        Console.WriteLine($"Name: {Name}");
        Console.WriteLine($"Age: {Age}");
        Console.WriteLine($"Department: {Department}");
        Console.WriteLine($"Salary: {Salary}");
    }

    public virtual decimal CalculateBonus()
    {
        return Salary * 0.05m;
    }

    public void Work()
    {
        Console.WriteLine($"{Name} is working in {Department} department.");
    }
}