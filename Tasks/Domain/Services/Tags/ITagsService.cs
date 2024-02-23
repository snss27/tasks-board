using Domain.Tags;
using Tools;

namespace Domain.Services.Tags;

public interface ITagsService
{
    Result SaveTag(TagBlank tagBlank);
    Tag? GetTag(Guid id);
    Page<Tag> GetTagsPage(String searchText, Int32 pageNumber, Int32 countInPage);
    Result RemoveTag(Guid id);
    Tag[] GetTags(String searchText);
    Tag[] GetTags(Guid[] ids);
}
