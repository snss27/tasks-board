
namespace Domain.Tags;

public class Tag
{
    public Guid Id { get; }
    public String Name { get; }
    public String Color { get; }
    public Tag(Guid id, String name, String color)
    {
        Id = id;
        Name = name;
        Color = color;
    }
}
