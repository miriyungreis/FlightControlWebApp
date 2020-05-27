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
    public class ServersController : ControllerBase
    {
        private readonly IRepository _context;

        public ServersController(IRepository context)
        {
            _context = context;
        }

        // GET: api/Servers
        [HttpGet]
        public async Task<IEnumerable<Server>> GetServers()
        {
            try
            {
                return await _context.GetServers();
            }
            catch {
                return null;
            }
        }
        // POST: api/Servers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public  ActionResult<Server> PostServer(Server server)
        {
            try
            {
                int result = _context.AddServer(server);
                if (result == -1)
                {
                    return Conflict();
                }
                return StatusCode(201);
            }
            catch
            {
                return BadRequest();
            }
           

            
        }

        // DELETE: api/Servers/5
        [HttpDelete("{id}")]
        public ActionResult<Server> DeleteServer(string id)
        {
            var result = _context.DeleteServer(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        
        }

        
    }
}

