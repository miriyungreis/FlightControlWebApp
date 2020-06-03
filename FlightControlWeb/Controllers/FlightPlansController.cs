using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlightControlWeb.Data;
using FlightControlWeb.Models;

namespace FlightControlWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightPlanController : ControllerBase
    {
        private readonly IRepository _context;

        public FlightPlanController(IRepository context)
        {
            _context = context;
        }

        // GET: api/FlightPlans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FlightPlanDto>> GetFlightPlan(string id)
        {
            try
            {
                return await _context.GetFlightPlan(id);
            }
            catch { return StatusCode(500); }
        }



        // POST: api/FlightPlans
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FlightPlanDto>> PostFlightPlan([FromBody]FlightPlanDto flightPlanDto)
        {
            var result = new ContentResult();
            try
            {
              if (!(IsValid(flightPlanDto)))
                {
                    result.StatusCode = 400;
                    result.Content = "flight plan is invalid";
                }
               else {
                    var flightPlan = await _context.AddFlightPlan(flightPlanDto);
                    return CreatedAtAction("GetFlightPlan", new { id = flightPlan.Value.FlightId }, flightPlanDto);
                }
            }
            catch 
            {
                result.StatusCode = 500;
            }
            return result;
        }

        private bool IsValid(FlightPlanDto flightPlanDto)
        {
            //check for null values in flightPlanDto entities
            if (flightPlanDto.CompanyName == null || flightPlanDto.InitialLocation == null 
                || flightPlanDto.Segments == null)
            {
                return false;
            }
                //check for out of range values
            if(flightPlanDto.InitialLocation.Longitude > 180||flightPlanDto.InitialLocation.Longitude< -180
                ||flightPlanDto.InitialLocation.Latitude > 90 || flightPlanDto.InitialLocation.Latitude < -90)
            {
                return false;
            }
            foreach(SegmentDto s in flightPlanDto.Segments)
            {
                if (s.Longitude > 180 || s.Longitude < -180
                || s.Latitude > 90 || s.Latitude < -90)
                {
                    return false;
                }
            }
            return true;
        }



    }
}

