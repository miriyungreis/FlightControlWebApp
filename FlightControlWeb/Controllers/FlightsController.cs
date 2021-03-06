﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using FlightControlWeb.Data;
using FlightControlWeb.Models;

namespace FlightControlWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly IRepository _context;

        public FlightsController(IRepository context)
        {
            _context = context;
        }

        // GET: api/Flights
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights()
        {
            var date = Request.Query["relative_to"];
            bool externalFlights = Request.Query.ContainsKey("sync_all");

            var result = await _context.GetFlights(date, externalFlights);
            if (result.Value == null)
            {
                return NotFound();
            }
            var resultList = result.Value.ToList();
            foreach(Flight f in resultList)
            {

                if (!isValid(f))
                {
                    resultList.Remove(f);
                }
            }
            return resultList;
            
        }

        private bool isValid(Flight flight)
        {
            //check for null values
            if (flight.FlightId == null || flight.CompanyName == null || flight.DateTime == null)
            {
                return false;
            }
            if (flight.Longitude > 180 || flight.Longitude < -180
                || flight.Latitude > 90 || flight.Latitude < -90)
            {
                return false;
            }
            return true;
        }







        // DELETE: api/Flights/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFlight(string id)
        {
            try
            {
                return await _context.DeleteFlight(id);
            }
            catch
            {
                return StatusCode(500);
            }
        }
    }
}

