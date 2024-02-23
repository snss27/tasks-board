using System.Security.Cryptography;
using Domain.Steps;
using Domain.Tags;
using Tools.Enums;

namespace Domain.Tasks;

public class ProjectTask
{
    public Guid Id { get; }
    public String Name { get; }
    public String Description { get; }
    public TaskType Type { get; }
    public PriorityType Priority { get; }
    public Guid StepId { get; }
    public Guid[] TagIds { get; }
    public DateTime? EndDateTime { get; }
    
    public ProjectTask(Guid id, String name, String description, TaskType taskType, PriorityType priorityType, Guid stepId, Guid[] tagIds, DateTime? endDateTime)
    {
        Id = id;
        Name = name;
        Type = taskType;
        Description = description;
        Priority = priorityType;
        StepId = stepId;
        TagIds = tagIds;
        EndDateTime = endDateTime;
    }
}