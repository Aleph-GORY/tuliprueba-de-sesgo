using Newtonsoft.Json;

namespace Tulipanas.Utility
{
    public static class Tools
    {
        public static string JsonResult(object result, string msg)
        {
            return JsonConvert.SerializeObject(new { data = result, message = msg });
        }
    }
}
