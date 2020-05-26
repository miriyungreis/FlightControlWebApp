using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlTypes;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic.CompilerServices;
using Newtonsoft.Json;

namespace FlightControlWeb.Models
{
        public class FlightPlan
        {
            [Key]
            [Required]
            public string FlightId { get; set; }
            public int Passengers { get; set; }
            [JsonPropertyName("company_name")]
            public string CompanyName { get; set; }

        [JsonPropertyName("initial_location")]

             public InitialLocation InitialLocation { get; set; }
            public List<Segment> Segments { get; set; } = new List<Segment>();
        }
        public class InitialLocation
        {
            [Key]
            [Required]
            public string Id { get; set; }
            public double Longitude { get; set; }
            public double Latitude { get; set; }
            [JsonPropertyName("date_time")]
            public DateTime DateTime { get; set; }
        }
    public class Segment
    {
        public int Id { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }

        [JsonPropertyName("timespan_seconds")]
        public int TimeSpanSeconds { get; set; }
        public string FlightId { get; set; }
        }
    public class FlightPlanDto
    {
        public int Passengers { get; set; }
        [JsonPropertyName("company_name")]
        public string CompanyName { get; set; }

        [JsonPropertyName("initial_location")]

        public InitialLocationDto InitialLocation { get; set; }
        public List<SegmentDto> Segments { get; set; } = new List<SegmentDto>();
    }
    public class SegmentDto
    {
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        [JsonPropertyName("timespan_seconds")]
        public int TimeSpanSeconds { get; set; }
    }

    public class InitialLocationDto
    {
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        [JsonPropertyName("date_time")]
        public DateTime DateTime { get; set; }
    }

    public class Location
    {
        public double  Longitude { get; set; }
        public double Latitude { get; set; }
    }
}