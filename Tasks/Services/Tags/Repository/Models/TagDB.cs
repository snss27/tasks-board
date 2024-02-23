using Domain.Tags;
using Npgsql;
using Tools;
using Tools.Enums;

namespace Services.Tags.Repository.Models;

public class TagDB
{
    public Guid Id { get; set; }
    public String Name { get; set; }
    public String Color { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime CreateDateTimeUtc { get; set; }
    public DateTime? ModifiedDateTime { get; set; }
    public DateTime? ModifiedDateTimeUtc { get; set; }
    public Boolean IsRemoved { get; set; }

    public static TagDB FromReader(NpgsqlDataReader reader)
    {
        Guid id = new Guid(reader["id"].ToString()!);
        String name = reader["name"].ToString()!;
        String color = reader["color"].ToString()!;

        DateTime createDateTime = DateTime.Parse(reader["createddatetime"].ToString()!);
        DateTime createDateTimeUtc = DateTime.Parse(reader["createddatetimeutc"].ToString()!);

        DateTime? modifiedDateTime = null;
        Object modifiedDateTimeObj = reader["modifieddatetime"];
        if (modifiedDateTimeObj is not DBNull) modifiedDateTime = (DateTime)modifiedDateTimeObj;

        DateTime? modifiedDateTimeUtc = null;
        Object modifiedDateTimeUtcObj = reader["modifieddatetime"];
        if (modifiedDateTimeUtcObj is not DBNull) modifiedDateTimeUtc = (DateTime)modifiedDateTimeObj;

        Boolean isRemoved = Boolean.Parse(reader["isremoved"].ToString()!);

        return new TagDB()
        {
            Id = id,
            Name = name,
            Color = color,
            CreateDateTime = createDateTime,
            CreateDateTimeUtc = createDateTimeUtc,
            ModifiedDateTime = modifiedDateTime,
            ModifiedDateTimeUtc = modifiedDateTimeUtc,
            IsRemoved = isRemoved
        };
    }


    public Tag ToTag()
    {
        return new Tag(Id, Name, Color);
    }
}
