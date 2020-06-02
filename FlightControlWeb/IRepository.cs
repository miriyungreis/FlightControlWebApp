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
        Task<ActionResult> DeleteFlight(string id);
        Task<ActionResult<FlightPlanDto>> GetFlightPlan(string id);
        Task<ActionResult<FlightPlan>> AddFlightPlan(FlightPlanDto flightPlanDto);
        Task<IEnumerable<Server>> GetServers();
        Task<ActionResult<Server>> AddServer(Server server);
        Task<ActionResult<Server>> DeleteServer(string id);

    }
}
