using Domain.Services.Steps;
using Domain.Services.Tags;
using Domain.Services.Tasks;
using Services.Steps;
using Services.Steps.Repository;
using Services.Tags;
using Services.Tags.Repository;
using Services.Tasks;
using Services.Tasks.Repository;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<ITasksService, TasksService>();
builder.Services.AddSingleton<IStepsService, StepsService>();
builder.Services.AddSingleton<IStepManagementService, StepManagementService>();
builder.Services.AddSingleton<ITagsService, TagsService>();

builder.Services.AddSingleton<StepsRepository>();
builder.Services.AddSingleton<TagsRepository>();
builder.Services.AddSingleton<TasksRepository>();

builder.Services.AddMvc();

var app = builder.Build();

app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader() );


app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();