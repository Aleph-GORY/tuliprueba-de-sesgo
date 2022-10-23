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
using System.Net.Http;
using Microsoft.Build.Tasks.Deployment.Bootstrapper;
using System.Collections.Generic;
using System.Text;

namespace Tulipanas.Utility
{
    public static class Tools
    {
        public static string JsonResult(object result, string msg)
        {
            return JsonConvert.SerializeObject(new { data = result, message = msg });
        }

        public static async Task<string> GetLambdaAsync(string json)
        {
            using var client = new HttpClient();
            client.BaseAddress = new Uri("https://r7zn88k1ye.execute-api.us-east-1.amazonaws.com");
            /*      var content = new FormUrlEncodedContent(new[]
                  {
                      new KeyValuePair<string, string>("", "login")
                  });*/
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var result = await client.PostAsync("/dev/runtest", content);
            string resultContent = await result.Content.ReadAsStringAsync();
            return resultContent;
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

        public static async Task<string> GetS3FileAsync(string Path)
        {
            string Bucket = Startup.StaticConfiguration.GetValue<string>("Bucket");
            string AccessKey = Startup.StaticConfiguration.GetValue<string>("AccessKey");
            string SecretKey = Startup.StaticConfiguration.GetValue<string>("SecretKey");
            string responseBody = "";
            using var S3Client = new AmazonS3Client(AccessKey, SecretKey, Amazon.RegionEndpoint.USEast1);
            GetObjectRequest request = new GetObjectRequest
            {
                BucketName = Bucket,
                Key = Path
            };
            using (GetObjectResponse response = await S3Client.GetObjectAsync(request))
            using (Stream responseStream = response.ResponseStream)
            using (StreamReader reader = new(responseStream))
            {
                responseBody = reader.ReadToEnd();
            }

            return responseBody;
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
            var transcriptionJobResponse = await transcribeClient.StartTranscriptionJobAsync(transcriptionJobRequest);
        }
    }
}