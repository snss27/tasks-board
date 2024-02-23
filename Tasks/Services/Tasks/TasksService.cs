using Domain.Services.Steps;
using Domain.Services.Tags;
using Domain.Services.Tasks;
using Domain.Steps;
using Domain.Tags;
using Domain.Tasks;
using Services.Tasks.Repository;
using Tools;
using Tools.Enums;

namespace Services.Tasks;

public class TasksService : ITasksService
{
    private readonly TasksRepository _repository;
    private readonly ITagsService _tagsService;
    private readonly IStepsService _stepsService;

    public TasksService(IStepsService stepsService, ITagsService tagsService, TasksRepository repository)
    {
        _stepsService = stepsService;
        _tagsService = tagsService;
        _repository = repository;
    }

    public Result SaveTask(TaskBlank taskBlank)
    {
        if (taskBlank.Id is not null)
        {
            ProjectTask? task = _repository.GetTask(taskBlank.Id.Value);

            if (task is null) return Result.Fail("Тег не найден");
        }

        if (String.IsNullOrWhiteSpace(taskBlank.Name)) return Result.Fail("name", "Укажите имя");
        if (taskBlank.Name.Length > 60) return Result.Fail("name", "Имя не может быть больше 60 символов");

        if (String.IsNullOrWhiteSpace(taskBlank.Description)) return Result.Fail("description", "Добавьте описание");
        if (taskBlank.Description.Length > 350) return Result.Fail("description", "Описание не может быть больше 350 символов");

        if (taskBlank.Priority is null) return Result.Fail("priority", "Укажите приоритет задачи");
        if (!PriorityTypeExtensions.IsExist(taskBlank.Priority)) throw new Exception("Такого приоритета не существует");

        if (taskBlank.Type is null) return Result.Fail("type", "Укажите тип задачи");
        if (!TaskTypeExtensions.IsExist(taskBlank.Type)) throw new Exception("Такого типа не существует");

        if (taskBlank.StepId is null) return Result.Fail("step", "Укажите шаг задачи");
        Step? step = _stepsService.GetStep(taskBlank.StepId.Value);
        if (step is null) throw new Exception("Шаг не найден");
        if(step.IsLast) taskBlank.EndDateTime = DateTime.Now;
         
        Guid[] existingTagIds = taskBlank.TagIds.Select(id => id).ToArray();
        Tag[] existingTags = _tagsService.GetTags(existingTagIds);
        if (existingTags.Length != taskBlank.TagIds.Length) throw new Exception("Существуют не все теги из запрошенных");

        taskBlank.Id ??= Guid.NewGuid();

        _repository.SaveTask(taskBlank);
        return Result.Success();
    }

    public ProjectTask? GetTask(Guid id)
    {
        return _repository.GetTask(id);
    }

    public ProjectTask[] GetTasks(Guid[] stepIds, String searchText = "")
    {
        if (stepIds.Length == 0) return Array.Empty<ProjectTask>();

        Step[] steps = _stepsService.GetSteps();
        if (!steps.Any(step => stepIds.Any(stepId => step.Id == stepId))) throw new Exception("Не все шаги существуют");

        return _repository.GetTasks(stepIds, searchText);
    }

    public Result MoveTask(Guid taskId, Guid stepId)
    {
        ProjectTask[] tasks = _repository.GetTasks();
        if (!tasks.Any(task => task.Id == taskId)) throw new Exception("Такой задачи не существует");

        Step[] steps = _stepsService.GetSteps();
        if (!steps.Any(step => step.Id == stepId)) throw new Exception("Такого шага не существует");

        _repository.MoveTask(taskId, stepId);
        return Result.Success();
    }

    public Result RemoveTask(Guid taskId)
    {
        ProjectTask task = _repository.GetTask(taskId);
        if (task is null) throw new Exception("Такой задачи не существует");

        _repository.RemoveTask(taskId);
        return Result.Success();
    }

    public ProjectTask[] GetTasksByStepIds(Guid[] stepIds)
    {
        if (stepIds.Length == 0) return Array.Empty<ProjectTask>();

        return _repository.GetTasksByStepIds(stepIds);
    }

    public ProjectTask[] GetTasksByStepId(Guid stepId)
    {
        return _repository.GetTaskByStepId(stepId);
    }
}