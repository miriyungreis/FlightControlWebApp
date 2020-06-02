using Bogus;
using System;
using System.Collections.Generic;
using System.Text;
using FlightControlWeb.Models;
using Bogus.DataSets;
using System.Linq;

namespace FlightControlUnitTests
{
    public static partial class FlightPlanGenerator
    {
        public static Faker<InitialLocationDto> testInitialLocation { get; } =
            new Faker<InitialLocationDto>().StrictMode(true)
            .RuleFor(i => i.Longitude, f => f.Random.Double(-180, 180))
            .RuleFor(i => i.Latitude, f => f.Random.Double(-90, 90))
            .RuleFor(i => i.DateTime, f => DateTime.UtcNow);
        public static Faker<SegmentDto> testSegment { get; } =
            new Faker<SegmentDto>().StrictMode(true)
            .RuleFor(s => s.Longitude, f => f.Random.Double(-180, 180))
            .RuleFor(s => s.Latitude, f => f.Random.Double(-90, 90))
            .RuleFor(s => s.TimeSpanSeconds, f => f.Random.Int(60, 79200));
            




        public enum CompanyName { SwissAir, IsraAir, ElAl, TurkishAir, Oceanic  }
        public static Faker<FlightPlanDto> testFlightPlan { get; } =
            new Faker<FlightPlanDto>().StrictMode(true)
            .RuleFor(fp => fp.Passengers, f => f.Random.Int(0, 300))
            .RuleFor(fp => fp.CompanyName, f => f.Company.CompanyName())
            .RuleFor(fp => fp.InitialLocation, f => testInitialLocation.Generate(1).First())
            .RuleFor(fp => fp.Segments, f => testSegment.Generate(3).ToList());
        
            
    }
}
