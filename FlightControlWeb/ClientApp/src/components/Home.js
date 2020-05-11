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
          <Col className="map" sm={9}>
            <FlightMap></FlightMap>
          </Col>
          <Col className="my-flights" sm={3}>
            <MyFlights></MyFlights>
          </Col>
        </Row>

        <Row>
          <Col className="flight-details" sm={9}>
            <FlightDetails></FlightDetails>
          </Col>

          <Col className="external-flights" sm={3}>
            <ExternalFlights></ExternalFlights>
          </Col>
        </Row>
      </Container>
    );
  }
}
