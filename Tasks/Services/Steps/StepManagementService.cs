using Domain.Services.Steps;
using Domain.Services.Tasks;
using Domain.Steps;
using Domain.Tasks;
using Services.Steps.Repository;
using Services.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tools;

namespace Services.Steps
{
    public class StepManagementService : IStepManagementService
    {
        private readonly ITasksService _tasksService;
        private readonly IStepsService _stepsService;
        private readonly StepsRepository _stepsRepository;

        public StepManagementService(ITasksService tasksService, IStepsService stepsService, StepsRepository stepsRepository)
        {
            _stepsService = stepsService;
            _tasksService = tasksService;
            _stepsRepository = stepsRepository;
        }

        public Result SaveSteps(StepBlank[] stepBlanks)
        {
            if (stepBlanks.Length == 0) return Result.Fail("Добавьте шаги");

            Guid[] existingStepIds = stepBlanks.Where(stepBlank => stepBlank.Id is not null).Select(stepBlank => stepBlank.Id!.Value).ToArray();
            Step[] existingSteps = _stepsService.GetSteps(existingStepIds);

            Step[] allDbSteps = _stepsService.GetSteps();
            Guid[] allDbStepIds = allDbSteps.Select(step => step.Id).ToArray();

            Guid[] deletedStepIds = allDbStepIds.Except(existingStepIds).ToArray();
            ProjectTask[] tasksInDeletingSteps = _tasksService.GetTasksByStepIds(deletedStepIds);
            if (tasksInDeletingSteps.Length > 0) return Result.Fail("Вы пытаетесь удалить шаг, который имеет задачи");

            foreach ((Int32 index, StepBlank stepBlank) in stepBlanks.WithIndex())
            {
                if (String.IsNullOrWhiteSpace(stepBlank.Name)) return Result.Fail($"{index}_Name", "Укажите имя");
                if (stepBlank.Name.Length > 100) return Result.Fail($"{index}_Name", "Имя должно быть меньше 100 символов");

                if (stepBlank.Id is not null)
                {
                    Step? step = existingSteps.FirstOrDefault(step => step.Id == stepBlank.Id);

                    if (step is null) return Result.Fail("Шаг не найден");
                }

                stepBlank.Id ??= Guid.NewGuid();
            }

            _stepsRepository.SaveSteps(stepBlanks);

            return Result.Success();
        }


        public Result IsStepEmpty(Guid stepId)
        {
            ProjectTask[] tasksInStep = _tasksService.GetTasksByStepId(stepId);
            if (tasksInStep.Length > 0) return Result.Fail("Шаг содержит задачи");
            else return Result.Success();
        }


    }
}
