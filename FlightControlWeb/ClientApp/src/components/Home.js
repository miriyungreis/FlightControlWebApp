import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import FlightMap from './flight_control/FlightMap';
import { FlightDetails } from './flight_control/FlightDetails';
import { MyFlights } from './flight_control/MyFlights';
import { ExternalFlights } from './flight_control/ExternalFlights';
import "./Home.css";

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <Container fluid="true">
                <Row noGutters="true" >
                    <Col sm={8} >
                        <Row noGutters="true" >
                            <FlightMap></FlightMap>
                        </Row>
                        <Row noGutters="true" style={{ backgroundColor: '#f1f1f1' }}>
                            <FlightDetails></FlightDetails>
                        </Row>
                    </Col>


                    <Col sm={4} >
                        <Row noGutters="true" >
                            <MyFlights></MyFlights>
                        </Row>
                        <Row noGutters="true">
                            <ExternalFlights></ExternalFlights>
                        </Row>
                    </Col>

                </Row>
            </Container>
        );
    }
}
