using Npgsql;
using Tools.Enums;
using Tools;
using Domain.Steps;

namespace Services.Steps.Repository.Models;

public class StepDB
{
    public Guid Id { get; set; }
    public String Name { get; set; }
    public Boolean IsDone { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime CreateDateTimeUtc { get; set; }
    public DateTime? ModifiedDateTime { get; set; }
    public DateTime? ModifiedDateTimeUtc { get; set; }
    public Boolean IsLast { get; set; }
    public Int32 Position { get; set; }

    public static StepDB FromReader(NpgsqlDataReader reader)
    {
        Guid id = new Guid(reader["id"].ToString()!);
        String name = reader["name"].ToString()!;
        Boolean isLast = Boolean.Parse(reader["islast"].ToString()!);

        DateTime createDateTime = DateTime.Parse(reader["createddatetime"].ToString()!);
        DateTime createDateTimeUtc = DateTime.Parse(reader["createddatetimeutc"].ToString()!);

        DateTime? modifiedDateTime = null;
        Object modifiedDateTimeObj = reader["modifieddatetime"];
        if (modifiedDateTimeObj is not DBNull) modifiedDateTime = (DateTime)modifiedDateTimeObj;

        DateTime? modifiedDateTimeUtc = null;
        Object modifiedDateTimeUtcObj = reader["modifieddatetime"];
        if (modifiedDateTimeUtcObj is not DBNull) modifiedDateTimeUtc = (DateTime)modifiedDateTimeObj;
        Int32 position = Int32.Parse(reader["position"].ToString()!);


        return new StepDB()
        {
            Id = id,
            Name = name,
            IsLast = isLast,
            CreateDateTime = createDateTime,
            CreateDateTimeUtc = createDateTimeUtc,
            ModifiedDateTime = modifiedDateTime,
            ModifiedDateTimeUtc = modifiedDateTimeUtc,
            Position = position
        };
    }

    public Step ToStep()
    {
        return new Step(Id, Name, IsLast, Position);
    }
}
