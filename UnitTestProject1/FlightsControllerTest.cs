using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Moq;
using FlightControlWeb;
using FlightControlWeb.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace FlightControlUnitTests
{
    [TestClass]
    class FlightsControllerTest
    {
        [TestMethod]
        public async Task GetFlightsWithoutSyncAllReturnsListOfFlightObjects()
        {
            var mockRepository = new Mock<IRepository>();
            
            var flightController = new FlightsController(mockRepository.Object){
                ControllerContext = new ControllerContext { HttpContext = new DefaultHttpContext()}
            };
        }


        
    }

}
