using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Tulipanas.Utility;


namespace Tulipanas.Controllers
{
    [ApiController]
    public class CommonController : ControllerBase
    {
        [HttpPost, Route("api/[controller]/UploadFile")]
        public void UploadFileAsync(IFormFile file)
        {
            DateTime dt = DateTime.Now;
            string path = dt.Year.ToString() + "-" + dt.Month.ToString() + "-" + dt.Day.ToString() + "-" + dt.Millisecond.ToString(), fileName = file.FileName, fullPath = path + "/" + fileName;
            if (file.FileName.ToUpper().Contains(".MP3"))
            {
                using var fileStream = file.OpenReadStream();
                byte[] bytes = new byte[file.Length];
                fileStream.Read(bytes, 0, (int)file.Length);
                Tools.UploadInputFileToS3(fullPath, bytes);
                AccessRepository.CreateWork(path, fullPath, null);
                _ = Tools.TranscribeInputFileAsync(path, fileName);
            }
            else
            {
                AccessRepository.CreateWork(path, null, null);
            }

        }
    }
}
