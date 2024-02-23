using Domain.Steps;
using Domain.Tags;
using Services.Steps;
using Services.Tags;
using Tools;

namespace Tasks;

public class Program
{
    #region StepMethods
    //public static Result ChangeStepMethod()
    //{
    //    StepsService stepsService = new();

    //    Console.WriteLine("\nВведите Id шага");
    //    String? stepIdString = Console.ReadLine();

    //    Guid.TryParse(stepIdString, out Guid id);
    //    if (id == Guid.Empty) return new Result("Неправильный формат ввода Id");

    //    Domain.Steps.Step? step = stepsService.GetStep(id);
    //    if (step is null) return new Result("Шага с таким Id не существует");

    //    Console.WriteLine("\nВведите новое имя шага");
    //    String? stepName = Console.ReadLine();

    //    Console.WriteLine("\nУкажите выполнен ли шаг? (1 - выполнен, 2 - не выполнен)");
    //    Int32 isDoneInt32 = Int32.Parse(Console.ReadLine());
    //    if (isDoneInt32 != 1 && isDoneInt32 != 2) return new Result("Неправильный ввод закончености шага");
    //    Boolean isDone = isDoneInt32 switch
    //    {
    //        1 => true,
    //        2 => false
    //    };

    //    StepBlank stepBlank = new()
    //    {
    //        Id = id,
    //        Name = stepName,
    //        IsLast = isDone,
    //    };

    //    return stepsService.SaveSteps(stepBlank);
    //}
    //public static Result SaveStepMethod()
    //{
    //    StepsService stepsService = new();

    //    Console.WriteLine("\nВведите имя шага");
    //    String? stepName = Console.ReadLine();

    //    Console.WriteLine("Укажите выполнен ли шаг? (1 - выполнен, 2 - не выполнен)");
    //    Int32 isDoneInt32 = Int32.Parse(Console.ReadLine());
    //    if (isDoneInt32 != 1 && isDoneInt32 != 2) return new Result("Неправильный ввод закончености шага");
    //    Boolean isDone = isDoneInt32 switch
    //    {
    //        1 => true,
    //        2 => false
    //    };

    //    StepBlank stepBlank = new()
    //    {
    //        Name = stepName,
    //        IsLast = isDone
    //    };

    //    return stepsService.SaveSteps(stepBlank);
    //}
    //public static Domain.Steps.Step? GetStepMethod()
    //{
    //    StepsService stepsService = new();

    //    Console.WriteLine("\nВведите Id шага для получения");
    //    String? stepIdString = Console.ReadLine();

    //    Guid.TryParse(stepIdString, out Guid id);
    //    if (id == Guid.Empty) return null;

    //    return stepsService.GetStep(id);
    //}
    //public static Result DeleteStepMethod()
    //{
    //    StepsService stepsService = new();

    //    Console.WriteLine("\nВведите Id тега для удаления");
    //    String? stepIdString = Console.ReadLine();

    //    Guid.TryParse(stepIdString, out Guid id);
    //    if (id == Guid.Empty) return new Result("Введенная строка не соответствует формату Id");

    //    return stepsService.RemoveStep(id);
    //}
    //#endregion
    //#region TagMethods
    //public static Result ChangeTag()
    //{
    //    TagsService tagsService = new();

    //    Console.WriteLine("\nВведите новое имя тега");
    //    String? tagName = Console.ReadLine();

    //    Console.WriteLine("\nВведите новый цвет тега");
    //    String? tagColor = Console.ReadLine();

    //    Console.WriteLine("\nВведите Id тега");
    //    String? tagIdString = Console.ReadLine();

    //    Guid.TryParse(tagIdString, out Guid id);
    //    if (id == Guid.Empty) return new Result("Неправильный формат ввода Id");

    //    Domain.Tags.Tag? tag = tagsService.GetTag(id);
    //    if (tag is null) return new Result("Тега с таким Id не существует");

    //    TagBlank tagBlank = new()
    //    {
    //        Id = id,
    //        Name = tagName,
    //        Color = tagColor
    //    };

    //    return tagsService.SaveTag(tagBlank);
    //}
    //public static Result SaveTag()
    //{
    //    TagsService tagsService = new();

    //    Console.WriteLine("\nВведите имя тега");
    //    String? tagName = Console.ReadLine();

    //    Console.WriteLine("\nВведите цвет тега");
    //    String? tagColor = Console.ReadLine();

    //    TagBlank tagBlank = new()
    //    {
    //        Name = tagName,
    //        Color = tagColor
    //    };

    //    return tagsService.SaveTag(tagBlank);
    //}
    //public static Domain.Tags.Tag? GetTag()
    //{
    //    TagsService tagsService = new();

    //    Console.WriteLine("\nВведите Id тега для получения");
    //    String? tagIdString = Console.ReadLine();

    //    Guid.TryParse(tagIdString, out Guid id);
    //    if (id == Guid.Empty) return null;

    //    return tagsService.GetTag(id);
    //}
    //public static Result RemoveTag()
    //{
    //    TagsService tagsService = new();

    //    Console.WriteLine("\nВведите Id тега для удаления");
    //    String? tagIdString = Console.ReadLine();

    //    Guid.TryParse(tagIdString, out Guid id);
    //    if (id == Guid.Empty) return new Result("Введенная строка не соответствует формату Id");

    //    return tagsService.RemoveTag(id);
    //}
    #endregion 
    public static void Main(string[] args)
    {
        #region Menu
        //Result result;
        //while (true)
        //{
        //    Console.WriteLine("\nВыберите действие:");
        //    Console.WriteLine("Добавить тег - 1");
        //    Console.WriteLine("Изменить тег - 2");
        //    Console.WriteLine("Получить тег - 3");
        //    Console.WriteLine("Удалить тег - 4");
        //    Console.WriteLine("Выход - 5");

        //    Int32 actionNumber = Int32.Parse(Console.ReadLine());
        //    if (actionNumber == 5) break;

        //    switch (actionNumber)
        //    {
        //        case 1:
        //            result = SaveTag();
        //            if (!result.IsSuccess) Console.WriteLine(result.Errors[0]);
        //            else Console.WriteLine("\nТег добавлен");
        //            break;

        //        case 2:
        //            result = ChangeTag();
        //            if (!result.IsSuccess) Console.WriteLine(result.Errors[0]);
        //            else Console.WriteLine("\nТег изменен");
        //            break;

        //        case 3:
        //            Domain.Tags.Tag? tag = GetTag();
        //            if (tag is null) Console.WriteLine("\nТег не найден");
        //            else Console.WriteLine($"\nТег найден:\nИмя: {tag.Name}\nЦвет: {tag.Color}");
        //            break;

        //        case 4:
        //            result = RemoveTag();
        //            if (!result.IsSuccess) Console.WriteLine(result.Errors[0]);
        //            else Console.WriteLine("\nТег удалён");
        //            break;
        //    }
        }
        #endregion
        #region Steps
        //Result result = SaveStepMethod();
        //if (!result.IsSuccess) Console.WriteLine(result.Errors[0]);
        //else Console.WriteLine("\nШаг добавлен");

        //result = ChangeStepMethod();
        //if (!result.IsSuccess) Console.WriteLine(result.Errors[0]);
        //else Console.WriteLine("\nШаг изменен");

        //Step? step = GetStepMethod();
        //if (step is null) Console.WriteLine("\nШаг не найден");
        //else Console.WriteLine($"\nШаг найден:\nЕго имя: {step.Name}\nВыполнен ли шаг: {step.IsDone}");

        //result = DeleteStepMethod();
        //if (!result.IsSuccess) Console.WriteLine(result.Errors[0]);
        //else Console.WriteLine("\nШаг удалён");
        #endregion
    }
