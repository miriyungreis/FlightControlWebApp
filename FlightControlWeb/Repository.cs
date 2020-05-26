using FlightControlWeb.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using FlightControlWeb.Models;
using System.Threading;
using System.Net.Http;
using Newtonsoft.Json;
using System.Net;
using System.Text.Json;

namespace FlightControlWeb
{

    public class Repository : IRepository
    {
        private readonly MyDbContext _context;
        private readonly HttpClient _client;
        public Repository(MyDbContext context, IHttpClientFactory factory)
        {
            _context = context;
            _client = factory.CreateClient("api");
        }
        public async Task<ActionResult<FlightPlan>> AddFlightPlan(FlightPlanDto flightPlanDto)
        {
            string flightId = CreateId(flightPlanDto.CompanyName);
            var flightPlan = new FlightPlan
            {
                FlightId = flightId,
                Passengers = flightPlanDto.Passengers,
                CompanyName = flightPlanDto.CompanyName,
                InitialLocation = new InitialLocation
                {
                    Id = flightId,
                    Longitude = flightPlanDto.InitialLocation.Longitude,
                    Latitude = flightPlanDto.InitialLocation.Latitude,
                    DateTime = flightPlanDto.InitialLocation.DateTime
                }
            };
            FromSegmentsDtoToSegments(flightPlanDto.Segments, flightPlan.Segments, flightId);

            _context.FlightsPlans.Add(flightPlan);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw;
            }

            return flightPlan;
        }

        public int AddServer(Server server)
        {
            _context.Servers.Add(server);
            try
            {
                _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ServerExists(server.ServerId))
                {
                    return -1;
                }
                else
                {
                    throw;
                }
            }
            return 0;
        }

        public bool DeleteFlight(string id)
        {
            var flightPlan = _context.FlightsPlans.Single(f=> f.FlightId == id);
            if (flightPlan != null)
            {
                var initialLocation = _context.InitialLocation.Single(i => i.Id == id);
                _context.InitialLocation.Remove(initialLocation);
                var segments = _context.Segments.Where(s => s.FlightId == id);
                foreach(Segment s in segments)
                {
                    _context.Segments.Remove(s);
                }
                _context.FlightsPlans.Remove(flightPlan);
                _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public bool DeleteServer(string id)
        {
            if (!ServerExists(id))
            {
                return false;
            }
            var server = _context.Servers.Find(id);
            _context.Servers.Remove(server);
            _context.SaveChangesAsync();
            return true;
        }

        public async Task<ActionResult<FlightPlanDto>> GetFlightPlan(string id)
        {
            if (FlightPlanExists(id))
            {
                var flightPlan = await _context.FlightsPlans.FindAsync(id);
                var initialLocation = await _context.InitialLocation.FindAsync(id);
                var segments = _context.Segments.Where(s => s.FlightId == id).ToList();
                var flightPlanDto = new FlightPlanDto
                {
                    Passengers = flightPlan.Passengers,
                    CompanyName = flightPlan.CompanyName,
                    InitialLocation = new InitialLocationDto
                    {
                        Longitude = initialLocation.Longitude,
                        Latitude = initialLocation.Latitude,
                        DateTime = initialLocation.DateTime
                    }
                };
                FromSegmentsToSegmentsDto(segments, flightPlanDto.Segments);
                
                return flightPlanDto;
            }
            foreach (Server s in _context.Servers)
            {
                try
                {
                    var url = s.ServerURL + "/api/FlightPlan/" + id;
                    HttpResponseMessage response = await _client.GetAsync(url);
                    if (response.StatusCode == HttpStatusCode.OK && response.Content != null)
                    {
                        var content = response.Content;
                        var data = await content.ReadAsStringAsync();
                        var serializeOptions = new JsonSerializerOptions
                        {
                            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                            WriteIndented = true
                        };
                        var externalFlightPlan = System.Text.Json.JsonSerializer.Deserialize<FlightPlanDto>(data, serializeOptions);
                        return externalFlightPlan;
                    }
                }
                catch { }
            }
            //Todo
            return null;
        }


        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights(string strDateTime, bool syncAll)
        {
            List<Flight> flights = new List<Flight>();
            DateTime dateTime = DateTimeOffset.Parse(strDateTime).DateTime;


            foreach (FlightPlan fp in _context.FlightsPlans)
            {
                InitialLocation initialLocation = _context.InitialLocation.FindAsync(fp.FlightId).Result;
                if (initialLocation!=null && ((initialLocation.DateTime.CompareTo(dateTime) < 0 && LandingTime(fp).CompareTo(dateTime) > 0)||initialLocation.DateTime.CompareTo(dateTime)==0))
                {
                    Location location = GetFlightLocation(fp, dateTime);
                    if (location != null)
                    {
                        flights.Add(new Flight
                        {
                            FlightId = fp.FlightId,
                            Longitude = location.Longitude,
                            Latitude = location.Latitude,
                            Passengers = fp.Passengers,
                            CompanyName = fp.CompanyName,
                            DateTime = dateTime,
                            IsExternal = false
                        });

                    }
                }

            }
            if (!(syncAll))
                return flights;


            //todo
            foreach (Server s in _context.Servers)
            {
                try
                {
                    var url = s.ServerURL + "/api/Flights?relative_to=" + strDateTime;
                    HttpResponseMessage response = await _client.GetAsync(url);
                    if (response.StatusCode == HttpStatusCode.OK && response.Content != null)
                    {
                        var content = response.Content;
                        var data = await content.ReadAsStringAsync();
                        var serializeOptions = new JsonSerializerOptions
                        {
                            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                            WriteIndented = true
                        };

                        var externalFlights = System.Text.Json.JsonSerializer.Deserialize<IEnumerable<Flight>>(data, serializeOptions);
                        foreach (Flight f in externalFlights)
                        {
                            if (IsValidFlight(f))
                            {
                                f.IsExternal = true;
                                flights.Add(f);
                                await _context.Map.AddAsync(new FlightServerMap { FlightId = f.FlightId, ServerId = s.ServerId });
                                await _context.SaveChangesAsync();
                            }

                        }
                    }
                }
                catch { }
            }
               
            return flights;
        }

        public IEnumerable<Server> GetServers()
        {
            return _context.Servers.ToList();
        }
        private bool ServerExists(string id)
        {
            return _context.Servers.Any(e => e.ServerId == id);
        }
        private bool FlightPlanExists(string id)
        {
            return _context.FlightsPlans.Any(e => e.FlightId == id);
        }

        private void FromSegmentsToSegmentsDto(List<Segment> segments, List<SegmentDto> segmentsDto)
        {
            List<SegmentDto> newSegments = new List<SegmentDto>();
            foreach (Segment s in segments)
            {
                var segment = new SegmentDto
                {
                    Longitude = s.Longitude,
                    Latitude = s.Latitude,
                    TimeSpanSeconds = s.TimeSpanSeconds
                };
                segmentsDto.Add(segment);

            }
        }
        private string CreateId(string companyName)
        {
            Random rand = new Random();
            string prefix = companyName.Length > 2 ? companyName.Substring(0, 2).ToUpper() : companyName;
            int digitSequence = rand.Next(10000, 100000);
            string flightId = prefix + digitSequence.ToString();
            return flightId;
        }
        private void FromSegmentsDtoToSegments(List<SegmentDto> segmentsDto, List<Segment> segments, string flightId)
        {
            int count = 0;
            Random rnd = new Random();
            int id = rnd.Next(10000, 100000);
            foreach (SegmentDto s in segmentsDto)
            {
                Segment segment = new Segment
                {
                    //random id with 5 digits
                    Id = id + count,
                    Longitude = s.Longitude,
                    Latitude = s.Latitude,
                    TimeSpanSeconds = s.TimeSpanSeconds,
                    FlightId = flightId
                };
                segments.Add(segment);
                count++;

            }
        }

        private DateTime LandingTime(FlightPlan flightPlan)
        {
            var initialLocation = _context.InitialLocation.FindAsync(flightPlan.FlightId).Result;
            DateTime landingDateTime = initialLocation.DateTime;
            var segments = _context.Segments.Where(s => s.FlightId == flightPlan.FlightId);
            foreach (Segment s in segments)
            {
                landingDateTime = landingDateTime.AddSeconds(s.TimeSpanSeconds);
            }
            return landingDateTime;
        }

        private Location GetFlightLocation(FlightPlan flightPlan, DateTime dateTime)
        {
            DateTime time = flightPlan.InitialLocation.DateTime;
            DateTime prevTime = time;
            Location prevLocation = new Location { Longitude = flightPlan.InitialLocation.Longitude, Latitude = flightPlan.InitialLocation.Latitude };
            Location location = new Location();
            var segments = flightPlan.Segments.OrderBy(s => s.Id);
            foreach (Segment segment in segments)
            {
                if (time.AddSeconds(segment.TimeSpanSeconds).CompareTo(dateTime) > 0)
                {
                    TimeSpan DeltaTime = dateTime - prevTime;
                    var velocityX = (segment.Latitude - prevLocation.Latitude) / (segment.TimeSpanSeconds);
                    location.Latitude = prevLocation.Latitude + velocityX * (int)DeltaTime.TotalSeconds;
                    var velocityY = (segment.Longitude - prevLocation.Longitude) / (segment.TimeSpanSeconds);
                    location.Longitude = prevLocation.Longitude +  velocityY * (int)DeltaTime.TotalSeconds;
                    return location;
                }
                prevLocation.Latitude = segment.Latitude;
                prevLocation.Longitude = segment.Longitude;
                prevTime = time;
            }
            return null;
        }

        bool IsValidFlight(Flight flight)
        {
            if (flight.FlightId != null && flight.CompanyName != null && flight.DateTime != null)
            {
                return true;
            }
            return false;
        }
    }
}
