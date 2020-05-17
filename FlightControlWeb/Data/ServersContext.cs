using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightControlWeb.Models;
namespace FlightControlWeb.Data
{
    public class ServersContext : DbContext
    {
        public ServersContext(DbContextOptions options) : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(@"Data Source = Servers.db;");
        }
        public DbSet<Server> Servers { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)

        {

            base.OnModelCreating(builder);

        }
    }

}
