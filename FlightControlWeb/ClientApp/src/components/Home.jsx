import React, { Component } from "react";
import FlightMap from "./flight_control/FlightMap.jsx";
import { FlightDetails } from "./flight_control/FlightDetails.jsx";
import { MyFlights } from "./flight_control/MyFlights.jsx";
import { ExternalFlights } from "./flight_control/ExternalFlights.jsx";
import axios from "axios";

/*** API creation using AXIOS (for react) ***/
const api = axios.create({
  baseURL: `http://127.0.0.1:5500/ClientApp/src/tests/flights/`,
});

/*** The Home Page of App - The Dash - Board! ***/
export class Home extends Component {
  static displayName = Home.name;
  interval = null;

  componentDidMount() {
    this.interval = setInterval(this.getFlights, 1000);
    this.getFlights();
  }

  constructor() {
    super();
  }

  state = {
    clicked_flight_id: [],
    my_flights: [],
    external_flights: [],
  };

  getFlights = async () => {
    let res = await api.get("/flight_1.json").then((res) => {
      console.log(res.data);
      this.setState({ my_flights: res.data });
    });
  };

  onFlightClick = (flight_id) => {
    this.setState({ clicked_flight_id: flight_id });
  };

  render() {
    return (
      <div className="top-container">
        <div className="map">
          {/* <h4>Map Of Flights - Live</h4> */}
          <FlightMap></FlightMap>
        </div>
        <div className="my-flights">
          <h4>My Flights</h4>
          <MyFlights
            my_flights={this.state.my_flights}
            onFlightClick={this.onFlightClick}
          ></MyFlights>
        </div>
        <div className="flight-data">
          <h4>Flight Details</h4>
          <FlightDetails
            clicked_flight_id={this.state.clicked_flight_id}
            my_flights={this.state.my_flights}
          ></FlightDetails>
        </div>
        <div className="external-flights">
          <h4>External Flights</h4>
          <ExternalFlights></ExternalFlights>
        </div>
      </div>
    );
  }
}
