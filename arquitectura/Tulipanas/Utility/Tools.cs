using Newtonsoft.Json;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.TranscribeService;
using Amazon.TranscribeService.Model;
using Microsoft.Extensions.Configuration;
using Amazon.S3.Transfer;
using System.IO;

namespace Tulipanas.Utility
{
    public static class Tools
    {
        public static string JsonResult(object result, string msg)
        {
            return JsonConvert.SerializeObject(new { data = result, message = msg });
        }

        public static void UploadInputFileToS3(string Path, byte[] Bytes)
        {
            string Bucket = Startup.StaticConfiguration.GetValue<string>("Bucket");
            string AccessKey = Startup.StaticConfiguration.GetValue<string>("AccessKey");
            string SecretKey = Startup.StaticConfiguration.GetValue<string>("SecretKey");

            using var S3Client = new AmazonS3Client(AccessKey, SecretKey, Amazon.RegionEndpoint.USEast1);
            using var TransferUtility = new TransferUtility(S3Client);
            var request = new TransferUtilityUploadRequest
            {
                BucketName = Bucket,
                Key = Path,
                InputStream = new MemoryStream(Bytes)
            };
            TransferUtility.Upload(request);
        }
    }
}
