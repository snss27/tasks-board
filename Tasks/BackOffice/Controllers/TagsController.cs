using Domain.Services.Tags;
using Domain.Tags;
using Microsoft.AspNetCore.Mvc;
using Services.Tags;
using Tools;

namespace BackOffice.Controllers
{
    public class TagsController : Controller
    {
        private readonly ITagsService _tagsService;

        public TagsController(ITagsService tagsService) {
            _tagsService = tagsService;
        }

        [HttpPost("/tags/save")]
        public Result SaveTag([FromBody] TagBlank tagBlank)
        {
            return _tagsService.SaveTag(tagBlank);
        }

        [HttpPost("/tags/get/ids")]
        public Tag[] GetTags([FromBody] Guid[] ids)
        {
            return _tagsService.GetTags(ids);
        }

        [HttpPost("/tags/remove")]
        public Result RemoveTag([FromQuery] Guid id)
        {
            return _tagsService.RemoveTag(id);
        }

        [HttpGet("/tags/get")]
        public Tag? GetTag([FromQuery] Guid id)
        {
            return _tagsService.GetTag(id);
        }

        [HttpGet("/tags/getPage")]
        public Page<Tag> GetTagsPage([FromQuery] String searchText, [FromQuery] Int32 pageNumber, [FromQuery] Int32 countInPage)
        {
            return _tagsService.GetTagsPage(searchText, pageNumber, countInPage);
        }

        [HttpGet("/tags/search")]
        public Tag[] GetTags([FromQuery] String searchText)
        {
            return _tagsService.GetTags(searchText);
        }
    }
}