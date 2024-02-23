using Npgsql;
namespace Tools;

public static class GlobalDatabase
{
    public static NpgsqlConnection CreateConnection()
    {
        return new NpgsqlConnection("Host=localhost;UserName=postgres;Password=postgres;Database=postgres");
    }
    public static NpgsqlCommand CreateCommand(this NpgsqlConnection connection, String request)
    {
        return new NpgsqlCommand(request, connection);
    }
    public static void AddParametr<T>(this NpgsqlCommand command, String name, T? value)
    {
        _ = value is not null ? command.Parameters.AddWithValue(name, value) : command.Parameters.AddWithValue(name, DBNull.Value);
    }
}
