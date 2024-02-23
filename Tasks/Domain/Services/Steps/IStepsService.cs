using Domain.Steps;
using Domain.Tags;
using Tools;

namespace Domain.Services.Steps;

public interface IStepsService
{ 
    Step? GetStep(Guid stepId);
    Step[] GetSteps(Guid[] stepIds);
    Step[] GetSteps(); 
}
