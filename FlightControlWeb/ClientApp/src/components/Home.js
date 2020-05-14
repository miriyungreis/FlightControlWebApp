import React, { Component } from "react";
import FlightMap from "./flight_control/FlightMap";
import { FlightDetails } from "./flight_control/FlightDetails";
import { MyFlights } from "./flight_control/MyFlights";
import { ExternalFlights } from "./flight_control/ExternalFlights";
import FlightList from "./flight_control/FlightList";
import FlightInput from "./flight_control/FlightInput";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div className="top-container">
        <div className="map">
          <h4>Map Of Flights - Live</h4>
          <FlightMap></FlightMap>
        </div>
        <div className="my-flights">
          <h4>My Flights</h4>
          <MyFlights></MyFlights>
        </div>
        <div className="flight-data">
          <h4>Flight Details</h4>
          <FlightDetails></FlightDetails>
        </div>
        <div className="external-flights">
          <h4>External Flights</h4>
          <ExternalFlights></ExternalFlights>
        </div>
        <FlightInput />
        <FlightList />
      </div>
    );
  }
}
