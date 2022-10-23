using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Tulipanas.Models;
using Tulipanas.Utility;


namespace Tulipanas.Controllers
{
    [ApiController]
    public class CommonController : ControllerBase
    {
        [HttpPost, Route("api/[controller]/UploadFile")]
        public async Task UploadFileAsync(IFormFile file)
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
                string pathExit = path + "/result.json";
                var result = new StringBuilder();
                using (var reader = new StreamReader(file.OpenReadStream()))
                {
                    while (reader.Peek() >= 0)
                        result.AppendLine(reader.ReadLine());
                }
                string lambdaRes = await Tools.GetLambdaAsync(result.ToString());
                byte[] bytes = Encoding.ASCII.GetBytes(lambdaRes);
                Tools.UploadInputFileToS3(pathExit, bytes);
                AccessRepository.CreateWork(path, null, pathExit);
            }
        }

        [HttpGet, Route("api/[controller]/GetData")]
        public async Task<IActionResult> GetDataAsync()
        {
            List<Work> data = AccessRepository.GetSuccess();
            foreach (Work work in data)
            {
                work.Result = await Tools.GetS3FileAsync(work.CsvPath);
            }
            return Content(Tools.JsonResult(data, "Ok"));
        }
    }
}
