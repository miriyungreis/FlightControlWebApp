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
          <Col className="col" sm={{ size: "8", offset: 0 }}>
            <h4>Map Of Flights - Live</h4>
            <FlightMap></FlightMap>
          </Col>
          <Col className="col" sm={{ size: "3", offset: 1 }}>
            <MyFlights></MyFlights>
          </Col>
        </Row>

        <Row>
          <Col className="col" sm={{ size: "8", offset: 0 }}>
            <FlightDetails></FlightDetails>
          </Col>

          <Col className="col" sm={{ size: "3", offset: 1 }}>
            <ExternalFlights></ExternalFlights>
          </Col>
        </Row>
      </Container>
    );
  }
}
