using Domain.Services.Steps;
using Domain.Steps;
using Microsoft.AspNetCore.Mvc;
using Services.Steps;
using Tools;

namespace BackOffice.Controllers
{
    public class StepsContoller : Controller
    {
        private readonly IStepsService _stepsService;
        private readonly IStepManagementService _stepManagementService;

        public StepsContoller(IStepsService stepsService, IStepManagementService stepManagementService) {
            _stepsService = stepsService;
            _stepManagementService = stepManagementService;
        }

        [HttpPost("/steps/save")]
        public Result SaveSteps([FromBody] StepBlank[] stepBlanks)
        {
            return _stepManagementService.SaveSteps(stepBlanks);
        }

        [HttpGet("/steps/get")]
        public Step? GetStep([FromQuery] Guid stepId)
        {
            return _stepsService.GetStep(stepId);
        }

        [HttpGet("/steps/get/all")]
        public Step[] GetSteps()
        {
            return _stepsService.GetSteps();
        }

        [HttpGet("/steps/isEmpty")]
        public Result IsStepEmpty([FromQuery] Guid stepId)
        {
            return _stepManagementService.IsStepEmpty(stepId);
        }
    }
}