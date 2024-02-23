using Domain.Tags;
using Npgsql;
using Services.Tags.Repository.Models;
using Tools;

namespace Services.Tags.Repository;

public class TagsRepository
{

    public Tag[] GetTags(Guid[] tagIds)
    {
        if (tagIds.Length == 0) return Array.Empty<Tag>();

        using NpgsqlConnection connection = GlobalDatabase.CreateConnection();
        connection.Open();

        List<TagDB> tagDBs = new();

        String sql = "SELECT * FROM TAGS WHERE isremoved = false and id = any(@p_ids)";

        using NpgsqlCommand readCommand = connection.CreateCommand(sql);

        readCommand.AddParametr("p_ids", tagIds);

        using NpgsqlDataReader reader = readCommand.ExecuteReader();

        while (reader.Read())
        {
            TagDB tagDB = TagDB.FromReader(reader);
            tagDBs.Add(tagDB);
        }

        Tag[] tags = tagDBs.Select(tagDB => tagDB.ToTag()).ToArray();

        return tags;
    }

    public Tag[] GetTags(String searchText)
    {
        using NpgsqlConnection connection = GlobalDatabase.CreateConnection();
        connection.Open();

        List<TagDB> tagDBs = new();

        String sql = "SELECT * FROM TAGS WHERE isremoved = false and name ILIKE @p_name;";
        using NpgsqlCommand command = connection.CreateCommand(sql);

        command.AddParametr("p_name", "%" + searchText + "%");

        using NpgsqlDataReader reader = command.ExecuteReader();

        while (reader.Read())
        {
            TagDB tagDB = TagDB.FromReader(reader);
            tagDBs.Add(tagDB);
        }

        Tag[] tags = tagDBs.Select(tagDB => tagDB.ToTag()).ToArray();

        return tags;
    }

    public void SaveTag(TagBlank tagBlank)
    {
        using NpgsqlConnection connection = GlobalDatabase.CreateConnection();
        connection.Open();

        String sql = "INSERT INTO TAGS (id, name, color, createddatetime, createddatetimeutc, modifieddatetime, modifieddatetimeutc, isremoved)" +
            $"VALUES (@p_id, @p_name, @p_color, '{DateTime.Now}', '{DateTime.UtcNow}', null, null, false)" +
            $"ON CONFLICT (id) DO UPDATE SET " +
            $"name = @p_name," +
            $"color = @p_color," +
            $"modifieddatetime = '{DateTime.Now}'," +
            $"modifieddatetimeutc = '{DateTime.UtcNow}';";
        using NpgsqlCommand command = connection.CreateCommand(sql);

        command.AddParametr("p_id", tagBlank.Id);
        command.AddParametr("p_color", tagBlank.Color);
        command.AddParametr("p_name", tagBlank.Name);

        command.ExecuteNonQuery();
    }

    public void RemoveTag(Guid id)
    {
        using NpgsqlConnection connection = GlobalDatabase.CreateConnection();
        connection.Open();

        String sql = $"UPDATE TAGS SET isremoved = true, modifieddatetime = '{DateTime.Now}', modifieddatetimeutc = '{DateTime.UtcNow}' WHERE id = @p_id";

        using NpgsqlCommand deleteCommand = connection.CreateCommand(sql);

        deleteCommand.AddParametr("p_id", id);

        deleteCommand.ExecuteNonQuery();
    }

    public Tag? GetTag(Guid id)
    {
        using NpgsqlConnection connection = GlobalDatabase.CreateConnection();
        connection.Open();

        String sql = "SELECT * FROM TAGS WHERE id = @p_id and isremoved = false;";
        using NpgsqlCommand readCommand = connection.CreateCommand(sql);

        readCommand.AddParametr("p_id", id);

        using NpgsqlDataReader reader = readCommand.ExecuteReader();

        TagDB? tagDB = null;
        if(reader.Read())
        {
            tagDB = TagDB.FromReader(reader);
        }  

        return tagDB?.ToTag();
    }

    public Page<Tag> GetTagsPage(String searchText, Int32 pageNumber, Int32 countInPage)
    {
        using NpgsqlConnection connection = GlobalDatabase.CreateConnection();
        connection.Open();

        String sql = "SELECT *, count(*) OVER() AS full_count FROM TAGS WHERE name ILIKE @p_name and isremoved = false LIMIT @p_countInPage OFFSET @p_offset;";
        using NpgsqlCommand readCommand = connection.CreateCommand(sql);

        readCommand.AddParametr("p_countInPage", countInPage);
        readCommand.AddParametr("p_offset", (pageNumber - 1) * countInPage);
        readCommand.AddParametr("p_name", "%" + searchText + "%");

        using NpgsqlDataReader reader = readCommand.ExecuteReader();

        List<TagDB> tagsDB = new();
        Int32 totalRows = 0;

        while (reader.Read())
        {
            TagDB tagDB = TagDB.FromReader(reader);
            tagsDB.Add(tagDB);
            totalRows = Int32.Parse(reader["full_count"].ToString()!);
        }

        Tag[] tags = tagsDB.Select(tagDB => tagDB.ToTag()).ToArray();

        return new Page<Tag>(tags, totalRows);
    }
}