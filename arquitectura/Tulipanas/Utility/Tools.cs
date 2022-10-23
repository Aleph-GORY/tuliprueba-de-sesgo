using Newtonsoft.Json;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.TranscribeService;
using Amazon.TranscribeService.Model;
using Microsoft.Extensions.Configuration;
using Amazon.S3.Transfer;
using System.IO;
using System.Net;
using System;

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

        public static async Task TranscribeInputFileAsync(string Path, string fileName)
        {
            string Bucket = Startup.StaticConfiguration.GetValue<string>("Bucket");
            string AccessKey = Startup.StaticConfiguration.GetValue<string>("AccessKey");
            string SecretKey = Startup.StaticConfiguration.GetValue<string>("SecretKey");

            using var transcribeClient = new AmazonTranscribeServiceClient(AccessKey, SecretKey, Amazon.RegionEndpoint.USEast1);
            var media = new Media()
            {
                MediaFileUri = "s3://" + Bucket + "/" + Path + "/" + fileName
            };  
            var stttings = new Settings()
            {
               ShowSpeakerLabels = true,
               MaxSpeakerLabels = 10
            };
            var transcriptionJobRequest = new StartTranscriptionJobRequest()
            {
                LanguageCode = "es-US",
                Media = media,
                MediaFormat = MediaFormat.Mp3,
                TranscriptionJobName = "tulipanas-" + Path + "-" + fileName,
                OutputKey = Path + "/",
                OutputBucketName = Bucket,
                Settings = stttings
            };
            try
            {
                var transcriptionJobResponse = await transcribeClient.StartTranscriptionJobAsync(transcriptionJobRequest);
            }
            catch (Exception ex)
            {
                string message = ex.Message;
            }
            //if (transcriptionJobResponse.HttpStatusCode != HttpStatusCode.OK) throw new Exception("No se pudo crear la tarea.");
        }
    }
}