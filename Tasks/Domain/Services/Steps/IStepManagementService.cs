using Domain.Steps;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tools;

namespace Domain.Services.Steps
{
    public interface IStepManagementService
    {
        Result SaveSteps(StepBlank[] stepBlanks);
        Result IsStepEmpty(Guid stepId);
    }
}
