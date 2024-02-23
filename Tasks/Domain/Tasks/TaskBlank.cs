using Tools.Enums;

namespace Domain.Tasks;

public class TaskBlank
{
    public Guid? Id { get; set; }
    public String? Name { get; set; }
    public String? Description { get; set; }
    public TaskType? Type { get; set; }
    public PriorityType? Priority { get; set; }
    public Guid? StepId { get; set; }
    public Guid[] TagIds { get; set; } = Array.Empty<Guid>();
    public DateTime? EndDateTime { get; set; } = null;
}
