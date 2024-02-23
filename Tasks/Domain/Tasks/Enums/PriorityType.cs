namespace Tools.Enums;

public enum PriorityType
{
    Low = 1,
    Medium = 2,
    High = 3
}

public class PriorityTypeExtensions
{
    public static Boolean IsExist<T>(T type)
    {
        if (type is null) return false;

        if (Enum.IsDefined(typeof(PriorityType), type)) return true;

        return false;
    }
}
