
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightControlWeb.Models;

namespace FlightControlWeb.Data
{
    public class MyDbContext : DbContext 
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {

        }
        public DbSet<Server> Servers { get; set; }
        public DbSet<FlightPlan> FlightsPlans { get; set; }
        public DbSet<Segment> Segments { get; set; }
        public DbSet<FlightServerMap> Map { get; set; }
        public DbSet<InitialLocation> InitialLocation { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
        public DbSet<FlightControlWeb.Models.Flight> Flight { get; set; }
    }
}
