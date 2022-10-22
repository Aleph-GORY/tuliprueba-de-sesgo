using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Tulipanas.Controllers
{
    [ApiController]
    public class CommonController : ControllerBase
    {
        [HttpPost, Route("api/[controller]/UploadFile")]
        public void UploadFile(IFormFile file)
        {
        }
    }
}
