import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Button } from "reactstrap";

export class FlightDetails extends Component {
  static displayName = FlightDetails.name;

  state = {};

  findArrayElementByTitle = (array, title) => {
    return array.find((element) => {
      return element.title === title;
    });
  };

  presentFlightDetails() {
    return this.props.my_flights.map((flight) => {
      /* flight */
      if (flight.flight_id === this.props.clicked_flight_id) {
        return (
          <tr>
            <th scope="row">{flight.flight_id}</th>
            <td>{flight.company_name}</td>
            <td> {flight.passengers}</td>
            <td> {flight.longitude} </td>
            <td> {flight.latitude} </td>
            <td> {flight.is_external} </td>
          </tr>
        );
      }
    });
  }

  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>Flight ID</th>
              <th>Company</th>
              <th>Passengers</th>
              <th>Latitude</th>
              <th>Longtitude</th>
              <th>External?</th>
            </tr>
          </thead>
          <tbody>{this.presentFlightDetails()}</tbody>
        </Table>
      </div>
    );
  }
}

FlightDetails.propTypes = {
  clicked_flight_id: PropTypes.array.isRequired,
  my_flights: PropTypes.array.isRequired,
};
