using FlightControlWeb.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightControlWeb.Models;

namespace FlightControlWeb
{
    public interface IRepository
    {
        Task<ActionResult<IEnumerable<Flight>>> GetFlights(string date, bool syncAll);
        bool DeleteFlight(string id);
        Task<ActionResult<FlightPlanDto>> GetFlightPlan(string id);
        Task<ActionResult<FlightPlan>> AddFlightPlan(FlightPlanDto flightPlanDto);
        IEnumerable<Server> GetServers();
        int AddServer(Server server);
        bool DeleteServer(string id);

    }
}
