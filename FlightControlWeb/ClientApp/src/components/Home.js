import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import FlightMap from './flight_control/FlightMap';
import { FlightDetails } from './flight_control/FlightDetails';
import { Flights } from './flight_control/Flights';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <Container fluid>
            <Row>
                <Col sm={8}>
                    <FlightMap></FlightMap>
                </Col>
                <Col sm={4}>
                    <Flights></Flights>
                </Col>
            </Row>
            <Row>
                <Col sm={8}>
                    <FlightDetails>
                    </FlightDetails>
                </Col>
            </Row>
        </Container>
    );
  }
}
