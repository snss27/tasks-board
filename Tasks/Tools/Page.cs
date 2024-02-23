namespace Tools;

public class Page<T>
{
    public T[] Values { get; }
    public Int32 TotalRows { get; }

    public Page(T[] values, Int32 totalRows)
    {
        Values = values;
        TotalRows = totalRows;
    }

    public static Page<T> EmptyPage()
    {
        return new Page<T>(Array.Empty<T>(), 0);
    }
}
