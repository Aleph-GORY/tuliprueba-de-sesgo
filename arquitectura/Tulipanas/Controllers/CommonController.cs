using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using Tulipanas.Utility;


namespace Tulipanas.Controllers
{
    [ApiController]
    public class CommonController : ControllerBase
    {
        [HttpPost, Route("api/[controller]/UploadFile")]
        public void UploadFile(IFormFile file)
        {
            DateTime dt = DateTime.Now;
            string path = dt.Year.ToString() + "/"+ dt.Year.ToString() + "/"+ dt.Year.ToString() + "/" + file.FileName;
            using var fileStream = file.OpenReadStream();
            byte[] bytes = new byte[file.Length];
            fileStream.Read(bytes, 0, (int)file.Length);
            Tools.UploadInputFileToS3("path/" + file.FileName, bytes);
            AccessRepository.CreateWork(path, null);
            //  await TranscribeInputFile(filename, langCode);
        }
    }
}
