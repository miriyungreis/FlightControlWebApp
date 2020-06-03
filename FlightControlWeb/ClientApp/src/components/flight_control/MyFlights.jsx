import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import FlightItem from './FlightItem.jsx';

/*** the component - my flights ***/
export class MyFlights extends Component {
  static displayName = MyFlights.name;

  renderMyFlightsTabelData() {
    return Array.from(this.props.my_flights).map((flight) => {
      /* flight */
      if (!flight.is_external)
        return (
          <FlightItem
            key={flight.flight_id}
            flight={flight}
            onFlightClick={this.props.onFlightClick}
            clicked_flight_id={this.props.clicked_flight_id}
            onDeleteFlightClick={this.props.onDeleteFlightClick}
          />
        );
    });
  }

  renderMyExternalFlightsTabelData() {
    return Array.from(this.props.my_flights).map((flight) => {
      /* flight */
      if (flight.is_external)
        return (
          <FlightItem
            key={flight.flight_id}
            flight={flight}
            onFlightClick={this.props.onFlightClick}
            clicked_flight_id={this.props.clicked_flight_id}
            onDeleteFlightClick={this.props.onDeleteFlightClick}
          />
        );
    });
  }

  render() {
    return (
      <div className="flights-container">
        <div className="my-flights-container">
          <h4>My Flights</h4>
          <Table hover>
            <thead>
              <tr>
                <th>Flight ID</th>
                <th>Company</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.renderMyFlightsTabelData()}</tbody>
          </Table>
        </div>
        <div className="external-flights-container">
          <h4>External Flights</h4>
          <Table hover>
            <thead>
              <tr>
                <th>Flight ID</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>{this.renderMyExternalFlightsTabelData()}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

MyFlights.propTypes = {
  my_flights: PropTypes.array.isRequired,
  clicked_flight_id: PropTypes.string.isRequired,
};
