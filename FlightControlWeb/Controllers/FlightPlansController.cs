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
            var flightPlan = await _context.GetFlightPlan(id);

            if (flightPlan == null)
            {
                return NotFound();
            }

            return flightPlan;
        }



        // POST: api/FlightPlans
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FlightPlanDto>> PostFlightPlan(FlightPlanDto flightPlanDto)
        {
            try
            {
              var flightPlan = await _context.AddFlightPlan(flightPlanDto);
              return CreatedAtAction("GetFlightPlan", new { id = flightPlan.Value.FlightId }, flightPlanDto);
            }

            catch (DbUpdateException)
            {
                    throw;
            }
        }
  

       
    }
}

