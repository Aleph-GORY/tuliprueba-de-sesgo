using Tulipanas.Middlewares;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

namespace Tulipanas
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            StaticConfiguration = configuration;
        }

        public IConfiguration Configuration { get; }

        public static IConfiguration StaticConfiguration { get; private set; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOcelot();
            services.AddControllersWithViews();
            services.AddHttpContextAccessor();
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseOcelot().Wait();
            app.UseHsts();
            app.UseHttpsRedirection();
            app.UseStatusCodePages();
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseRouting();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(name: "default", pattern: "{controller}/{action}/{id?}");
            });
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                if (env.IsEnvironment("DEV")) spa.UseReactDevelopmentServer(npmScript: "start");
            });
        }
    }
}
