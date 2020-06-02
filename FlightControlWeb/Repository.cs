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
using System.Linq.Expressions;

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

            await _context.FlightsPlans.AddAsync(flightPlan);
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

        public async Task<ActionResult<Server>> AddServer(Server server)
        {
            var result = new Microsoft.AspNetCore.Mvc.ContentResult();
            await _context.Servers.AddAsync(server);
            try
            {
                 await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            { 
                if (ServerExists(server.ServerId))
                {
                    result.StatusCode = 400;
                    result.Content = "server allready exist\n";
                }
                else
                {
                    result.StatusCode = 500;
                }
                return result;
            }
            result.StatusCode = 201;
            return result;
        }

        public async Task<ActionResult> DeleteFlight(string id)
        {
            var result = new ContentResult();
            var flightPlan = _context.FlightsPlans.Single(f => f.FlightId == id);
            if (flightPlan != null)
            {
                var initialLocation = _context.InitialLocation.Single(i => i.Id == id);
                _context.InitialLocation.Remove(initialLocation);
                var segments = _context.Segments.Where(s => s.FlightId == id);
                foreach (Segment s in segments)
                {
                    _context.Segments.Remove(s);
                }
                _context.FlightsPlans.Remove(flightPlan);
                await _context.SaveChangesAsync();
                result.StatusCode = 204;
            }
            else
            {
                result.StatusCode = 400;
                result.Content = "the flight couldnot be found";
            }
            return result;
        }

        public async Task<ActionResult<Server>> DeleteServer(string id)
        {
            var result = new Microsoft.AspNetCore.Mvc.ContentResult();

            if (!ServerExists(id))
            {
                result.StatusCode = 400;
                result.Content = "server does not exist";
                return result;
            }
            var server = _context.Servers.Find(id);
            try {
                _context.Servers.Remove(server);
                await _context.SaveChangesAsync();
            }
            catch
            {
                result.StatusCode = 500;
            }
            result.StatusCode = 204;
            return result;
        }

        public async Task<ActionResult<FlightPlanDto>> GetFlightPlan(string id)
        {
            if (FlightPlanExists(id))
            {
                return await GetInternalFlightPlan(id);
            }
            var result = new Microsoft.AspNetCore.Mvc.ContentResult();
            try
            {
                //find the server which the requested flight plan came from
                var flightServerMap = await _context.Map.FindAsync(id);
                if (flightServerMap != null)
                {
                    return await GetExternalFlightPlan(id, result, flightServerMap);
                }


                result.StatusCode = 400;
                result.Content = "the flight you request does not exist in any internal nor external air control server\n";
                return result;
                
            }
            catch {
                result.StatusCode = 500;
                return result;
            }
            
        }

        private async Task<ActionResult<FlightPlanDto>> GetExternalFlightPlan(string id, ContentResult result, FlightServerMap flightServerMap)
        {
            var server = await _context.Servers.FindAsync(flightServerMap.ServerId);
            if (server != null)
            {

                var url = server.ServerURL + "/api/FlightPlan/" + id; ;
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

            result.StatusCode = 500;
            result.Content = "the server that contains the requested flight is unavailable\n";
            return result;
        }

        private async Task<ActionResult<FlightPlanDto>> GetInternalFlightPlan(string id)
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

        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights(string strDateTime, bool syncAll)
        {
            List<Flight> flights = new List<Flight>();
            DateTime dateTime = DateTimeOffset.Parse(strDateTime).DateTime;
            try
            {
                var internalFlights = await GetInternalFlights(dateTime);
                foreach (Flight f in internalFlights)
                {
                    flights.Add(f);
                }
            }
            catch { }
            if (!syncAll) {
                return flights;
            }
            var servers = await _context.Servers.ToListAsync();
            foreach (Server s in servers)
            {
                try
                {
                    await GetExternalFlights(strDateTime, s, flights);
                }
                catch { }
            }
            return flights;
        }

        private async Task GetExternalFlights(string strDateTime, Server s, List<Flight> flights)
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
                    await AddExternalFlight(s, flights, f);

                }
            }
        }

        private async Task AddExternalFlight(Server s, List<Flight> flights, Flight f)
        {
            if (IsValidFlight(f))
            {
                f.IsExternal = true;
                try
                {
                    var flightServer = await _context.Map.FindAsync(f.FlightId);
                    if (flightServer == null) { 
                        await _context.Map.AddAsync(new FlightServerMap { FlightId = f.FlightId, ServerId = s.ServerId });

                        await _context.SaveChangesAsync();

                    }
                    else if(flightServer.ServerId != s.ServerId){
                        _context.Map.Remove(flightServer);
                        await _context.SaveChangesAsync();
                        await _context.Map.AddAsync(new FlightServerMap { FlightId = f.FlightId, ServerId = s.ServerId });
                        await _context.SaveChangesAsync();

                    }
                    flights.Add(f);
                }
                catch { }
            
            }
        }

        public async Task<IEnumerable<Server>> GetServers()
        {
            return await _context.Servers.ToListAsync();
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

        private async Task<DateTime> LandingTime(FlightPlan flightPlan)
        {
            var initialLocation = await _context.InitialLocation.FindAsync(flightPlan.FlightId);
            DateTime landingDateTime = initialLocation.DateTime;
            var segments = _context.Segments.Where(s => s.FlightId == flightPlan.FlightId);
            foreach (Segment s in segments)
            {
                landingDateTime = landingDateTime.AddSeconds(s.TimeSpanSeconds);
            }
            return landingDateTime;
        }

        private async Task<Location> GetFlightLocation(FlightPlan flightPlan, DateTime dateTime)
        {
            var flightInitialLocation = await _context.InitialLocation.FindAsync(flightPlan.FlightId);
            DateTime time = flightInitialLocation.DateTime;
            DateTime prevTime = time;
            Location prevLocation = new Location { Longitude = flightInitialLocation.Longitude, Latitude = flightInitialLocation.Latitude };
            Location location = new Location();
            TimeSpan flightTime = dateTime - flightInitialLocation.DateTime;
            var segments = _context.Segments.Where(s => s.FlightId == flightPlan.FlightId);
            SegmentDto prevSegment = null;
            foreach (Segment segment in segments)
            {
                flightTime = flightTime - TimeSpan.FromSeconds(segment.TimeSpanSeconds);
                if (flightTime.TotalSeconds < 0 || flightTime.TotalSeconds == 0)
                {
                    if (flightTime.TotalSeconds == 0)
                    {
                        return new Location { Latitude = segment.Latitude, Longitude = segment.Longitude };
                    }
                    double ratio = ((segment.TimeSpanSeconds + flightTime.TotalSeconds) / (double)segment.TimeSpanSeconds);
                    

                    if (prevSegment == null)
                    {
                        location.Latitude = flightInitialLocation.Latitude + ratio * (segment.Latitude - flightInitialLocation.Latitude);
                        location.Longitude = flightInitialLocation.Longitude + ratio * (segment.Longitude - flightInitialLocation.Longitude);
                        return location;
                    }
                    location.Latitude = prevSegment.Latitude + (ratio * (segment.Latitude - prevSegment.Latitude));
                    location.Longitude = prevSegment.Longitude + (ratio * (segment.Longitude - prevSegment.Longitude));
                    return location;
                }
                prevSegment = new SegmentDto { Latitude = segment.Latitude, Longitude = segment.Longitude, TimeSpanSeconds = segment.TimeSpanSeconds };
            }
            
        
            return null;
        }


        private static Location NewMethod2(TimeSpan deltaTime, Location prevLocation, Segment segment)
        {
            Location location = new Location();
            
            //int direction = 1;
            //if (prevLocation.Latitude > segment.Latitude)
            //direction = -1;
            /*var velocityX = (segment.Latitude - prevLocation.Latitude) / (segment.TimeSpanSeconds);
            
            
            location.Latitude = prevLocation.Latitude + velocityX * deltaTime.TotalSeconds;
            var velocityY = (segment.Longitude - prevLocation.Longitude) / (segment.TimeSpanSeconds);
            location.Longitude = prevLocation.Longitude + velocityY * deltaTime.TotalSeconds;*/
            return location;
        }

        bool IsValidFlight(Flight flight)
        {
            if (flight.FlightId != null && flight.CompanyName != null && flight.DateTime != null)
            {
                return true;
            }
            return false;
        }

        private async Task<IEnumerable<Flight>> GetInternalFlights(DateTime dateTime)
        {
            List<Flight> flights = new List<Flight>();
            var flightsPlans = await _context.FlightsPlans.ToListAsync();

            foreach (FlightPlan fp in flightsPlans)
            {
                try
                {
                    await CreateFlight(dateTime, flights, fp);
                }
                catch { }
            }
            return flights;

        }

        private async Task CreateFlight(DateTime dateTime, List<Flight> flights, FlightPlan fp)
        {
            InitialLocation initialLocation = await _context.InitialLocation.FindAsync(fp.FlightId);
            var landingTime = await LandingTime(fp);
            if (initialLocation != null && ((initialLocation.DateTime.CompareTo(dateTime) < 0 && landingTime.CompareTo(dateTime) > 0) || initialLocation.DateTime.CompareTo(dateTime) == 0))
            {
                Location location = await GetFlightLocation(fp, dateTime);
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

    }
}
