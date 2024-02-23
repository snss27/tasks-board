using System.Text.RegularExpressions;
using Domain.Services.Tags;
using Domain.Tags;
using Services.Tags.Repository;
using Tools;

namespace Services.Tags;

public class TagsService : ITagsService
{

    private readonly TagsRepository _repository;

    public TagsService(TagsRepository repository)
    {
        _repository = repository;
    }

    public Result SaveTag(TagBlank tagBlank)
    {
        if(String.IsNullOrWhiteSpace(tagBlank.Name)) return Result.Fail("name", "Укажите имя");
        if(tagBlank.Name.Length > 100) return Result.Fail("name" ,"Имя должно быть меньше 100 символов");

        if (String.IsNullOrWhiteSpace(tagBlank.Color)) return Result.Fail("color", "Укажите цвет");

        String pattern = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";
        if (!Regex.IsMatch(tagBlank.Color, pattern, RegexOptions.IgnoreCase)) return Result.Fail("color", "Такого цвета не существует");

        if (tagBlank.Id is not null)
        {
            Tag? tag = _repository.GetTag(tagBlank.Id.Value);

            if (tag is null) return Result.Fail("Тег не найден");
        }

        tagBlank.Id ??= Guid.NewGuid();

        _repository.SaveTag(tagBlank);
        return Result.Success();
    }

    public Tag? GetTag(Guid id)
    {
        return _repository.GetTag(id);
    }

    public Result RemoveTag(Guid id)
    {
        Tag? tag = _repository.GetTag(id);

        if (tag is null) return Result.Fail("Тег не найден");

        _repository.RemoveTag(id);
        return Result.Success();
    }

    public Page<Tag> GetTagsPage(String searchText, Int32 pageNumber, Int32 countInPage)
    { 
        if (pageNumber <= 0 || countInPage <= 0) return Page<Tag>.EmptyPage();

        return _repository.GetTagsPage(searchText, pageNumber, countInPage);
    }

    public Tag[] GetTags(Guid[] tagIds)
    {
        return _repository.GetTags(tagIds);
    }

    public Tag[] GetTags(String searchText)
    {
        if(searchText is null || String.IsNullOrWhiteSpace(searchText)) return Array.Empty<Tag>();

        return _repository.GetTags(searchText);
    }
}
