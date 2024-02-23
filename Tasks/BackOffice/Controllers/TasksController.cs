using Domain.Services.Steps;
using Domain.Services.Tasks;
using Domain.Tags;
using Domain.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Steps;
using Services.Tasks;
using Tools;

namespace BackOffice.Controllers
{
    public class TasksController : Controller
    {
        private readonly ITasksService _tasksService;


        public TasksController(ITasksService tasksService)
        {
            _tasksService = tasksService;
        }


        [HttpPost("/tasks/save")]
        public Result SaveTask([FromBody] TaskBlank taskBlank)
        {
            return _tasksService.SaveTask(taskBlank);
        }

        [HttpPost("/tasks/get/list")]
        public ProjectTask[] GetTasks([FromQuery] String searchText, [FromBody] Guid[] stepIds)
        {
            return _tasksService.GetTasks(stepIds, searchText);
        }

        [HttpPost("/tasks/move")]
        public Result MoveTask([FromQuery] Guid taskId, [FromQuery] Guid stepId)
        {
            return _tasksService.MoveTask(taskId, stepId);
        }

        [HttpPost("/tasks/remove")]
        public Result RemoveTask([FromQuery] Guid taskId)
        {
            return _tasksService.RemoveTask(taskId);
        }

        [HttpGet("/tasks/get")]
        public ProjectTask? GetTask([FromQuery] Guid id)
        {
            return _tasksService.GetTask(id);
        }
    }
}
