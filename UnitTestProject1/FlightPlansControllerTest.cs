using Microsoft.VisualStudio.TestTools.UnitTesting;
using FlightControlWeb;
using Moq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using FlightControlWeb.Models;
using FlightControlWeb.Controllers;

using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

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
        [TestMethod]
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
            Assert.AreEqual(StatusCodes.Status500InternalServerError, ((ContentResult)result.Result).StatusCode);




        }
        [TestMethod]
        public async Task PostInValidFlightPlanReturnStatusCode()
        {
            //arrange
            FlightPlanDto flightPlanDto = FlightPlanGenerator.testFlightPlan;
            flightPlanDto.InitialLocation.Latitude = 200;
            var flightPlanController = new FlightPlanController(new Mock<IRepository>().Object);
            //act
            var result = await flightPlanController.PostFlightPlan(flightPlanDto);
            //assert
            Assert.AreEqual(StatusCodes.Status400BadRequest, ((ContentResult)result.Result).StatusCode);




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
