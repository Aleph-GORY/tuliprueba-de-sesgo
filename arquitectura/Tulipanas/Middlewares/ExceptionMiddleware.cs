using Tulipanas.Utility;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Data.SqlClient;
using System.Net;
using System.Threading.Tasks;

namespace Tulipanas.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (SqlException ex)
            {
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                await context.Response.WriteAsync(JsonConvert.SerializeObject(new { message = ex.Message }));
            }
            catch (Exception ex)
            {
                bool isNotFound = ex.Message.Contains("The SPA default page");
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = isNotFound ? 404 : (int)HttpStatusCode.InternalServerError;
                string exType = ex.GetType().ToString(), msg = ex.Message;
                if (exType != "System.Exception")
                    msg = "Error inesperado en el sistema.";
                await context.Response.WriteAsync(JsonConvert.SerializeObject(new { message = isNotFound ? "Recurso no encontrtado." : msg }));
            }
        }
    }
}
