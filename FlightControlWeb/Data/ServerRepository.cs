using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightControlWeb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlightControlWeb.Data
{
    public class ServerRepository
    {
        private readonly ServersContext _context;
        public ServerRepository(ServersContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<IEnumerable<ServerDto>>> GetServerList()
        {
            return await _context.Servers
          .Select(x => new ServerDto { ServerId = x.ServerId, ServerURL = x.ServerURL } )
          .ToListAsync();
        }
    }
}
