using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlightControlWeb.Data;
using FlightControlWeb.Models;
using Newtonsoft.Json;
using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Rewrite;
using System.Linq.Expressions;

namespace FlightControlWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServersController : ControllerBase
    {
        private readonly ServerRepository _context;

        public ServersController(ServerRepository context)
        {
            _context = context;
        }

        // GET: api/servers
        [HttpGet]
        
        public async Task<ActionResult<IEnumerable<ServerDto>>> GetServers() {
            var servers = await _context.GetServerList();
            return Ok(servers);
        }

        // GET: api/Servers/5
        

        // PUT: api/Servers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        /*
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServer(string id, Server server)
        {
            if (id != server.ServerId)
            {
                return BadRequest();
            }

            _context.Entry(server).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Servers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Server>> PostServer(Server server)
        {
            _context.Servers.Add(server);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServer", new { ServerId = server.ServerId }, server);
        }

        // DELETE: api/Servers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Server>> DeleteServer(string id)
        {
            var server = await _context.Servers.FindAsync(id);
            if (server == null)
            {
                return NotFound();
            }

            _context.Servers.Remove(server);
            await _context.SaveChangesAsync();

            return server;
        }

        private bool ServerExists(string id)
        {
            return _context.Servers.Any(e => e.ServerId == id);
        }
        */
    }
}
