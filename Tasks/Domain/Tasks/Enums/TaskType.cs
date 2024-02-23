namespace Tools.Enums;

public enum TaskType
{
    Task = 1,
    Bug = 2,
}

public class TaskTypeExtensions
{
    public static Boolean IsExist<T>(T type)
    {
        if (type is null) return false;

        if(Enum.IsDefined(typeof(TaskType), type)) return true;

        return false;
    }
}
