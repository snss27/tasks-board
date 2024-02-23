using Domain.Steps;
using Domain.Tasks;
using Npgsql;
using Services.Steps.Repository.Models;
using Services.Tasks.Repository.Models;
using Tools;

namespace Services.Tasks.Repository;

public class TasksRepository
{
    public void SaveTask(TaskBlank taskBlank)
    {
        using NpgsqlConnection connection = GlobalDatabase.CreateConnection();
        connection.Open();

        String sql = "INSERT INTO TASKS (id, name, description, type, priority, stepid, tagids, enddatetime, createddatetime, createddatetimeutc, modifieddatetime, modifieddatetimeutc, isremoved)" +
            $"VALUES (@p_id, @p_name, @p_description, @p_type, @p_priority, @p_stepid, @p_tagids, @p_enddatetime, '{DateTime.Now}', '{DateTime.UtcNow}', null, null, false)" +
            $"ON CONFLICT (id) DO UPDATE SET " +
            $"name = @p_name," +
            $"description = @p_description," +
            $"enddatetime = @p_enddatetime," +
            $"type = @p_type," +
            $"priority = @p_priority," +
            $"modifieddatetime = '{DateTime.Now}'," +
            $"modifieddatetimeutc = '{DateTime.UtcNow}'," +
            $"stepid = @p_stepid," +
            $"tagids = @p_tagids;";
        using NpgsqlCommand command = connection.CreateCommand(sql);

        command.AddParametr("p_id", taskBlank.Id);
        command.AddParametr("p_name", taskBlank.Name);
        command.AddParametr("p_description", taskBlank.Description);
        command.AddParametr("p_type", (Int32)taskBlank.Type!);
        command.AddParametr("p_priority", (Int32)taskBlank.Priority!);
        command.AddParametr("p_stepid", taskBlank.StepId);
        command.AddParametr("p_tagids", taskBlank.TagIds);
        command.AddParametr("p_enddatetime", taskBlank.EndDateTime);

        command.ExecuteNonQuery();
    }

    public ProjectTask? GetTask(Guid id)
    {
        using NpgsqlConnection connection = GlobalDatabase.CreateConnection();
        connection.Open();

        String sql = "SELECT * FROM TASKS WHERE id = @p_id and isremoved = false;";
        using NpgsqlCommand readCommand = connection.CreateCommand(sql);

        readCommand.AddParametr("p_id", id);

        using NpgsqlDataReader reader = readCommand.ExecuteReader();

        TaskDB? taskDB = null;
        if (reader.Read())
        {
            taskDB = TaskDB.FromReader(reader);
        }

        return taskDB?.ToProjectTask();
    }

    public ProjectTask[] GetTasks(Guid[] stepIds, String searchText)
    {
        using NpgsqlConnection connection = GlobalDatabase.CreateConnection();
        connection.Open();

        String sql = "SELECT * FROM TASKS WHERE isremoved = false and name ILIKE @p_name and stepid = any(@p_stepIds) ORDER BY modifieddatetime DESC;";
        using NpgsqlCommand command = connection.CreateCommand(sql);

        command.AddParametr("p_name", "%" + searchText + "%");
        command.AddParametr("p_stepIds", stepIds);

        using NpgsqlDataReader reader = command.ExecuteReader();

        List<TaskDB> taskDBs = new();

        while (reader.Read())
        {
            TaskDB taskDB = TaskDB.FromReader(reader);
            taskDBs.Add(taskDB);
        }

        return taskDBs.Select(task => task.ToProjectTask()).ToArray();
    }

    public ProjectTask[] GetTasks()
    {
        using NpgsqlConnection connection = GlobalDatabase.CreateConnection();
        connection.Open();

        String sql = "SELECT * FROM TASKS WHERE isremoved = false;";
        using NpgsqlCommand command = connection.CreateCommand(sql);

        using NpgsqlDataReader reader = command.ExecuteReader();

        List<TaskDB> taskDBs = new();

        while (reader.Read())
        {
            TaskDB taskDB = TaskDB.FromReader(reader);
            taskDBs.Add(taskDB);
        }

        return taskDBs.Select(task => task.ToProjectTask()).ToArray();
    }

    public ProjectTask[] GetTasksByStepIds(Guid[] stepIds)
    {
        using NpgsqlConnection connection = GlobalDatabase.CreateConnection();
        connection.Open();

        String sql = "SELECT * FROM TASKS WHERE isremoved = false and stepid = any(@p_stepIds);";
        using NpgsqlCommand command = connection.CreateCommand(sql);

        command.AddParametr("p_stepIds", stepIds);

        using NpgsqlDataReader reader = command.ExecuteReader();

        List<TaskDB> taskDBs = new();

        while (reader.Read())
        {
            TaskDB taskDB = TaskDB.FromReader(reader);
            taskDBs.Add(taskDB);
        }

        return taskDBs.Select(task => task.ToProjectTask()).ToArray();
    }

    public void MoveTask(Guid taskId, Guid stepId)
    {
        using NpgsqlConnection connection = GlobalDatabase.CreateConnection();
        connection.Open();

        String sql = $"UPDATE TASKS SET stepid = @p_stepId, modifieddatetime='{DateTime.Now}', modifieddatetimeutc = '{DateTime.UtcNow}' WHERE id = @p_taskId";
        using NpgsqlCommand command = connection.CreateCommand(sql);

        command.AddParametr("p_stepId", stepId);
        command.AddParametr("p_taskId", taskId);

        command.ExecuteNonQuery();
    }

    public void RemoveTask(Guid taskId)
    {
        using NpgsqlConnection connection = GlobalDatabase.CreateConnection();
        connection.Open();

        String sql = $"UPDATE TASKS SET isremoved = true, modifieddatetime='{DateTime.Now}', modifieddatetimeutc = '{DateTime.UtcNow}' WHERE id = @p_taskId";
        using NpgsqlCommand command = connection.CreateCommand(sql);

        command.AddParametr("p_taskId", taskId);

        command.ExecuteNonQuery();
    }

    public ProjectTask[] GetTaskByStepId(Guid stepId)
    {
        using NpgsqlConnection connection = GlobalDatabase.CreateConnection();
        connection.Open();

        String sql = "SELECT * FROM TASKS WHERE stepid = @p_stepId and isremoved = false;";
        using NpgsqlCommand readCommand = connection.CreateCommand(sql);

        readCommand.AddParametr("p_stepId", stepId);

        using NpgsqlDataReader reader = readCommand.ExecuteReader();

        List<TaskDB> taskDBs = new();

        while (reader.Read())
        {
            TaskDB taskDB = TaskDB.FromReader(reader);
            taskDBs.Add(taskDB);
        }

        return taskDBs.Select(task => task.ToProjectTask()).ToArray();
    }
}