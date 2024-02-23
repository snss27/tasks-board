namespace Tools;

public class Error
{
    public String Message { get; }
    public String? Key { get; }

    public Error(String message, String? key = null)
    {
        Message = message; 
        Key = key;
    }
}


public class Result
{
    
    public Error[] Errors { get; }
    public Boolean IsSuccess => Errors.Length == 0;

    public Result()
    {
        Errors = Array.Empty<Error>();
    }

    public Result(String error) 
    {
        Errors = new Error[] { new Error(error) };
    }

    public Result(String key, String error)
    {
        Errors = new Error[] { new Error(error, key) };
    }

    public static Result Success()
    {
        return new Result();
    }

    public static Result Fail(String error)
    {
        return new Result(error);
    }

    public static Result Fail(String key, String error)
    {
        return new Result(key, error);
    }
}
