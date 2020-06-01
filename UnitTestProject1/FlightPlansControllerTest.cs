using Microsoft.VisualStudio.TestTools.UnitTesting;
using FlightControlWeb;
using Moq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using FlightControlWeb.Models;
using FlightControlWeb.Controllers;

using System.Collections.Generic;

namespace FlightControlUnitTests
{
    [TestClass]
    public class FlightPlansControllerTest
    {
        [TestMethod]
        public async Task PostFlightPlanSucceedsReturnFlightPlanDto()
        {
            //arrange
            var repositoryMock = new Mock<IRepository>();
            FlightPlanDto flightPlanDto = FlightPlanGenerator.testFlightPlan;
            var flightPlan = FromDto(flightPlanDto);
            repositoryMock.Setup(r => r.AddFlightPlan(flightPlanDto)).ReturnsAsync(flightPlan);
            var flightPlanController = new FlightPlanController(repositoryMock.Object);
            //act
            var result = await flightPlanController.PostFlightPlan(flightPlanDto);
            //assert
            Assert.AreEqual(flightPlanDto, ((CreatedAtActionResult)result.Result).Value);
        }
        public async Task PostFlightPlanFailedReturnStatusCode()
        {
            //arrange
            var repositoryMock = new Mock<IRepository>();
            FlightPlanDto flightPlanDto = null;
            repositoryMock.Setup(r => r.AddFlightPlan(null)).Throws(new System.Exception());
            var flightPlanController = new FlightPlanController(repositoryMock.Object);
            //act
            var result = await flightPlanController.PostFlightPlan(flightPlanDto);
            //assert
            Assert.AreEqual(500, (StatusCodeResult)result.Result);




        }
        protected static FlightPlan FromDto(FlightPlanDto flightPlanDto)
        {
            List<Segment> segments = new List<Segment>();
            foreach (SegmentDto s in flightPlanDto.Segments)
            {
                segments.Add(new Segment
                {
                    Id = 1,
                    Longitude = s.Longitude,
                    Latitude = s.Latitude,
                    TimeSpanSeconds = s.TimeSpanSeconds,
                    FlightId = "AA00000"
                });
            }
            return new FlightPlan
            {
                FlightId = "AA00000",
                Passengers = flightPlanDto.Passengers,
                CompanyName = flightPlanDto.CompanyName,
                InitialLocation = new InitialLocation
                {
                    Id = "AA00000",
                    Longitude = flightPlanDto.InitialLocation.Longitude,
                    Latitude = flightPlanDto.InitialLocation.Latitude,
                    DateTime = flightPlanDto.InitialLocation.DateTime
                },
                Segments = segments,
            };


        }
    }
}
