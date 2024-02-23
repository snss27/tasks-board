using Domain.Services.Steps;
using Domain.Steps;
using Domain.Tags;
using Domain.Tasks;
using Services.Steps.Repository;
using Services.Tasks;
using System.Linq;
using Tools;

namespace Services.Steps;

public class StepsService : IStepsService
{
    private readonly StepsRepository _repository;

    public StepsService(StepsRepository repository)
    {
        _repository = repository;
    }

    public Step[] GetSteps(Guid[] stepIds)
    {
        return _repository.GetSteps(stepIds);
    }

    public Step? GetStep(Guid stepId)
    {
        return _repository.GetStep(stepId);
    }

    public Step[] GetSteps()
    {
        return _repository.GetSteps();
    }
     
}
