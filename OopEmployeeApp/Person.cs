abstract class Person
{
    public int Id { get; set; }
    public string Name { get; set; }

    protected int Age { get; set; }

    public Person(int id, string name, int age)
    {
        Id = id;
        Name = name;
        Age = age;
    }

    public void Greet()
    {
        Console.WriteLine($"Hello, my name is {Name}.");
    }

    public abstract void DisplayInfo();
}