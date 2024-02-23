using Domain.Tasks;
using Npgsql;
using Tools;
using Tools.Enums;

namespace Services.Tasks.Repository.Models;

public class TaskDB
{
    public Guid Id { get; set; }
    public String Name { get; set; }
    public String Description { get; set; }
    public TaskType Type { get; set; }
    public PriorityType Priority { get; set; }
    public Guid StepId { get; set; }
    public Guid[] TagIds { get; set; }
    public DateTime? EndDateTime { get; set; }
    public DateTime CreateDateTime { get; set; }
    public DateTime CreateDateTimeUtc { get; set; }
    public DateTime? ModifiedDateTime { get; set; }
    public DateTime? ModifiedDateTimeUtc { get; set; }
    public Boolean IsRemoved { get; set; }
    
    public static TaskDB FromReader(NpgsqlDataReader reader)
    {
        Guid id = new Guid(reader["id"].ToString()!);

        String name = reader["name"].ToString()!;

        String description = reader["description"].ToString()!;

        TaskType type = (TaskType)reader["type"];

        PriorityType priority = (PriorityType)reader["priority"];

        Guid stepId = new Guid(reader["stepid"].ToString()!);

        Guid[] tagIds = (Guid[])reader["tagids"];

        //String tagIdsStr = reader["tagids"].ToString()!;
        //String[] tagIdsStrings = tagIdsStr.Split(',').Select(s => s.Trim()).ToArray();
        //Guid[] tagIds = new Guid[tagIdsStrings.Length];
        //foreach((Int32 index, String tagIdStr) in tagIdsStrings.WithIndex())
        //{
        //    //if (Guid.TryParse(tagIdStr, out Guid guid)) tagIds[index] = guid;
        //    //else throw new Exception("неудалось считать теги задачи");
        //    tagIds[index] = new Guid(tagIdsStrings[index]);
        //}

        DateTime? endDateTime = null;
        Object endDateTimeObj = reader["enddatetime"];
        if (endDateTimeObj is not DBNull) endDateTime = (DateTime)endDateTimeObj;

        DateTime createDateTime = DateTime.Parse(reader["createddatetime"].ToString()!);

        DateTime createDateTimeUtc = DateTime.Parse(reader["createddatetimeutc"].ToString()!);

        DateTime? modifiedDateTime = null;
        Object modifiedDateTimeObj = reader["modifieddatetime"];
        if (modifiedDateTimeObj is not DBNull) modifiedDateTime = (DateTime)modifiedDateTimeObj;

        DateTime? modifiedDateTimeUtc = null;
        Object modifiedDateTimeUtcObj = reader["modifieddatetimeutc"];
        if (modifiedDateTimeUtcObj is not DBNull) modifiedDateTimeUtc = (DateTime)modifiedDateTimeObj;

        Boolean isRemoved = Boolean.Parse(reader["isremoved"].ToString()!);

        return new TaskDB()
        {
            Id = id,
            Name = name,
            Description = description,
            Type = type,
            Priority = priority,
            StepId = stepId,
            TagIds = tagIds,
            EndDateTime = endDateTime,
            CreateDateTime = createDateTime,
            CreateDateTimeUtc = createDateTimeUtc,
            ModifiedDateTime = modifiedDateTime,
            ModifiedDateTimeUtc = modifiedDateTimeUtc,
            IsRemoved = isRemoved
        };
    }

    public ProjectTask ToProjectTask()
    {
        return new ProjectTask(Id, Name, Description, Type, Priority, StepId, TagIds, EndDateTime);
    }
}
