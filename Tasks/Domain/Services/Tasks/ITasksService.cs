using Domain.Tags;
using Domain.Tasks;
using Tools;

namespace Domain.Services.Tasks;

public interface ITasksService
{
    Result SaveTask(TaskBlank taskBlank);
    ProjectTask? GetTask(Guid id);
    Result MoveTask(Guid taskId, Guid stepId);
    Result RemoveTask(Guid taskId);
    ProjectTask[] GetTasks(Guid[] stepIds, String searchText);
    ProjectTask[] GetTasksByStepIds(Guid[] stepIds);
    ProjectTask[] GetTasksByStepId(Guid stepId);
}
