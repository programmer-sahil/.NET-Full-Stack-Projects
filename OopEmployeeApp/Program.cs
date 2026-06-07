List<Employee> employees = new List<Employee>();

employees.Add(new FullTimeEmployee(1, "Sahil", 25, "IT", 30000, 12));
employees.Add(new PartTimeEmployee(2, "Rahul", 22, "Support", 15000, 80));
employees.Add(new FullTimeEmployee(3, "Amit", 28, "HR", 35000, 15));

Console.WriteLine("===== Employee Management OOP App =====");

foreach (Employee employee in employees)
{
    Console.WriteLine("--------------------------------");

    employee.Greet();
    employee.DisplayInfo();
    employee.Work();

    decimal bonus = employee.CalculateBonus();

    Console.WriteLine($"Bonus: {bonus}");
}

Console.WriteLine("--------------------------------");
Console.WriteLine("Program finished.");