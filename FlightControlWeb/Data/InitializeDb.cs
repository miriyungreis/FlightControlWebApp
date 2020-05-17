using FlightControlWeb.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightControlWeb.Data
{
    public class InitializeDb
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<ServersContext>();
                context.Database.EnsureCreated();
                if (context.Servers!=null && context.Servers.Any())
                {
                    return;
                }
                var servers = InitializeServers().ToArray();
                context.Servers.AddRange(servers);
                context.SaveChanges();
                //TODO - initialize flights db
            }
        }
        public static List<Server> InitializeServers()
        {
            List<Server> servers = new List<Server>()
            {
                new Server {Id = 1,  ServerId = "default1", ServerURL = "defoult_server1"},
                new Server {Id = 2, ServerId = "default2", ServerURL = "default_server2"},
                new Server {Id = 3, ServerId = "default3", ServerURL = "default_server3"}

            };
            return servers;
         }
    }
}
