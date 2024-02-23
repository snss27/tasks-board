namespace Domain.Steps;

public class Step
{
    public Guid Id { get; }
    public String Name { get; }
    public Boolean IsLast { get; }
    public Int32 Position { get; }

    public Step(Guid id, String name, Boolean isLast, Int32 position)
    {
        Id = id;
        Name = name;
        IsLast = isLast;
        Position = position;
    }
}
