import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import FlightMap from "./flight_control/FlightMap";
import { FlightDetails } from "./flight_control/FlightDetails";
import { MyFlights } from "./flight_control/MyFlights";
import { ExternalFlights } from "./flight_control/ExternalFlights";
import "../css/home.css";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <Container className="home-box">
        <Row>
          <Col className="col-1" sm={{ size: "9", offset: 0 }}>
            <h4>Map Of Flights - Live</h4>
            <FlightMap></FlightMap>
          </Col>

          <Col className="col-1" sm={{ size: "3", offset: 0 }}>
            <h4>My Flights</h4>
            <MyFlights></MyFlights>
          </Col>
        </Row>

        <Row>
          <Col className="col-2" sm={{ size: "9", offset: 0 }}>
            <h4>Flight Details</h4>
            <FlightDetails></FlightDetails>
          </Col>

          <Col className="col-2" sm={{ size: "3", offset: 0 }}>
            <h4>External Flights</h4>
            <ExternalFlights></ExternalFlights>
          </Col>
        </Row>
      </Container>
    );
  }
}
