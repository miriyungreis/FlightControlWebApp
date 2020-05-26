import React, { Component } from "react";
import FlightMap from "./flight_control/FlightMap.jsx";
import { FlightDetails } from "./flight_control/FlightDetails.jsx";
import { MyFlights } from "./flight_control/MyFlights.jsx";
import axios from "axios";
import Dropzone from "react-dropzone";
import DropZone from "./flight_control/DropZone";

/*** API creation using AXIOS (for react) ***/
const api = axios.create({
  baseURL: `http://ronyut4.atwebpages.com/ap2`,
  //baseURL: `http://localhost:3000`,
});

/*** The Home Page of App - The Dash - Board! ***/
export class Home extends Component {
  static displayName = Home.name;

  componentDidMount() {
/*    const getFlightsInterval = setInterval(this.getFlights, 5000);
    const getLocalTimeInterval = setInterval(this.getClock, 1000);
    this.setState(
      {
        date: new Date().toISOString().split(".").shift() + "Z",
        getLocalTimeInterval: getLocalTimeInterval,
        getFlightsInterval: getFlightsInterval,
      },
      function () {
        console.log("i am gonna get flights!");
        this.getClock();
        this.getFlights();
      }
    );*/
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.getFlightsInterval);
    clearInterval(this.state.getLocalTimeInterval);
  }

  state = {
    // regular (system date)
    getFlightsInterval: null,
    getLocalTimeInterval: null,
    date: "",
    clicked_flight_id: null,
    clicked_flight: [{}],
    my_flights: [],
    external_flights: [],
    clicked_flight_plan: null,
  };

  getClock = () => {
    this.setState({ date: new Date().toISOString().split(".").shift() + "Z" });
  };

  /*** Server Requests - REST API ***/
  // get("/api/Flights?relative_to=" + this.state.date)
  /* GET FLIGHTS relative to time */
  getFlights = async () => {
    try {
      let res = await api
        .get("/api/Flights?relative_to=" + this.state.date)
        .then((res) => {
          console.log("GET FLIGHTS: " + res.status + " " + res.data);
          this.setState({ my_flights: res.data });
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // TODO -
  // get("api/FlightPlan/" + this.state.clicked_flight_id)
  /* GET FLIGHT PLAN */
  getFlightPlan = async () => {
    console.log(this.state.clicked_flight_id);
    try {
      let res = await api
        .get("api/FlightPlan/" + this.state.clicked_flight_id)
        .then((res) => {
          console.log(res);
          //console.log(this.state.clicked_flight_plan);
          this.setState({
            clicked_flight_plan: JSON.parse(JSON.stringify(res.data)),
          });
          //console.log(this.state.clicked_flight_plan);
        });
    } catch (error) {
      console.log(error);
    }
  };

  /* DELETE FLIGHT */
  onDeleteFlightClick = async (flight_id) => {
    console.log("Deleting flight: " + flight_id);
    try {
      let res = await api.delete("/api/Flights/" + flight_id).then((res) => {
        this.setState({ clicked_flight: null });
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  /*** When clicking on flight either in map or in table ***/
  onFlightClick = (flight_id) => {
    console.log(flight_id);
    this.setState({ clicked_flight_id: flight_id }, function () {
      console.log("the clicked flight is: " + this.state.clicked_flight_id);
      if (this.state.clicked_flight_id != null) {
        this.getFlightPlan();
      } else {
        this.setState({ clicked_flight_plan: null });
      }
    });
  };

  // the dashboard of the application - the main container
  render() {
    return (
      <div className="top-container">
        <div className="map">
          <FlightMap
            my_flights={this.state.my_flights}
            onFlightClick={this.onFlightClick}
            clicked_flight_id={this.state.clicked_flight_id}
            clicked_flight_plan={this.state.clicked_flight_plan}
          ></FlightMap>
        </div>

        <div className="my-flights">
          <DropZone>
            <MyFlights
              my_flights={this.state.my_flights}
              onFlightClick={this.onFlightClick}
              clicked_flight_id={this.state.clicked_flight_id}
              onDeleteFlightClick={this.onDeleteFlightClick}
            ></MyFlights>
          </DropZone>
        </div>

        <div className="flight-data">
          <h4>Flight Details</h4>
          <FlightDetails
            clicked_flight_id={this.state.clicked_flight_id}
            my_flights={this.state.my_flights}
          ></FlightDetails>
        </div>
        <h4>The Time is in UTC: {this.state.date}</h4>
      </div>
    );
  }
}
