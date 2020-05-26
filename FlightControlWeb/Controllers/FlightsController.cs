using System;
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
            if (result != null)
            {
                return result;
            }
            return NotFound();
        }








        // DELETE: api/Flights/5
        [HttpDelete("{id}")]
        public ActionResult<Flight> DeleteFlight(string id)
        {
            var result = _context.DeleteFlight(id);
            if (result == false)
            {
                return NotFound();
            }

            return NoContent();
        }


    }
}

