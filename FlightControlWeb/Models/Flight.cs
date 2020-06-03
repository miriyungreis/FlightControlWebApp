using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FlightControlWeb.Models
{
    public class Flight
    {
        [JsonPropertyName("flight_id")]
        public string FlightId { get; set; }
        [Range(-180.0000001, 180, ErrorMessage = "longitude value is invalid")]
        public double Longitude { get; set; }
        [Range(-90.0000001, 90, ErrorMessage = "latitude value is invalid")]
        public double Latitude { get; set; }
        public int Passengers { get; set; }
        [JsonPropertyName("company_name")]
        public string CompanyName { get; set; }
        [JsonPropertyName("date_time")]
        public DateTime DateTime { get; set; }
        [JsonPropertyName("is_external")]
        public bool IsExternal { get; set; }
    }
}

