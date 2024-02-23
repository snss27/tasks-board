using Domain.Steps;
using Npgsql;
using Services.Steps.Repository.Models;
using Tools;
using Step = Domain.Steps.Step;

namespace Services.Steps.Repository;

public class StepsRepository
{
    public void SaveSteps(StepBlank[] stepBlanks)
    {
        using NpgsqlConnection connection = GlobalDatabase.CreateConnection();
        connection.Open();

        String sqlDelete = "DELETE FROM STEPS";
        using (NpgsqlCommand deleteCommand = connection.CreateCommand(sqlDelete))
        {
            deleteCommand.ExecuteNonQuery();
        }

        foreach ((Int32 index, StepBlank stepBlank) in stepBlanks.WithIndex())
        {
            String sql = "INSERT INTO STEPS (id, name, islast, position, createddatetime, createddatetimeutc, modifieddatetime, modifieddatetimeutc)" +
            $"VALUES (@p_id, @p_name, @p_islast, @p_position, '{DateTime.Now}', '{DateTime.UtcNow}', null, null)" +
            $"ON CONFLICT (id) DO UPDATE SET " +
            $"name = @p_name," +
            $"islast = @p_islast," +
            $"position = @p_position," +
            $"modifieddatetime = '{DateTime.Now}'," +
            $"modifieddatetimeutc = '{DateTime.UtcNow}';";
            using (NpgsqlCommand insertOnConflictCommand = connection.CreateCommand(sql))
            {
                insertOnConflictCommand.AddParametr("p_id", stepBlank.Id);
                insertOnConflictCommand.AddParametr("p_name", stepBlank.Name);
                insertOnConflictCommand.AddParametr("p_islast", stepBlank == stepBlanks.Last());
                insertOnConflictCommand.AddParametr("p_position", index);

                insertOnConflictCommand.ExecuteNonQuery();
            }
        }
    }

    public Step? GetStep(Guid stepId)
    {
        using NpgsqlConnection connection = GlobalDatabase.CreateConnection();
        connection.Open();

        String sql = "SELECT * FROM STEPS WHERE id = @p_id";

        using NpgsqlCommand command = connection.CreateCommand(sql);

        command.AddParametr("p_id", stepId);

        using NpgsqlDataReader reader = command.ExecuteReader();

        if (reader.Read())
        {
            StepDB stepDB = StepDB.FromReader(reader);
            return stepDB.ToStep();
        }

        return null;
    }

    public Step[] GetSteps(Guid[] stepIds)
    {
        if (stepIds.Length == 0) return Array.Empty<Step>();

        using NpgsqlConnection connection = GlobalDatabase.CreateConnection();
        connection.Open();


        List<StepDB> stepDbs = new();

        String sql = "SELECT * FROM STEPS WHERE id = any(@p_ids)";

        using NpgsqlCommand readCommand = connection.CreateCommand(sql);

        readCommand.AddParametr("p_ids", stepIds);

        using NpgsqlDataReader reader = readCommand.ExecuteReader();

        while (reader.Read())
        {
            StepDB stepDB = StepDB.FromReader(reader);
            stepDbs.Add(stepDB);
        }

        Step[] steps = stepDbs.Select(stepDB => stepDB.ToStep()).ToArray();

        return steps;
    }

    public Step[] GetSteps()
    {
        using NpgsqlConnection connection = GlobalDatabase.CreateConnection();
        connection.Open();

        String sql = "SELECT * FROM STEPS ORDER BY position";
        using NpgsqlCommand readCoomand = connection.CreateCommand(sql);

        using NpgsqlDataReader reader = readCoomand.ExecuteReader();

        List<StepDB> stepDBs = new();
        while (reader.Read())
        {
            StepDB stepDB = StepDB.FromReader(reader);
            stepDBs.Add(stepDB);
        }

        Step[] steps = stepDBs.Select(stepDB => stepDB.ToStep()).ToArray();
        return steps;
    }
}