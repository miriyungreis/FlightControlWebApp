import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import departures from "../../images/departures.svg";
import arrivals from "../../images/arrivals.svg";
export class FlightDetails extends Component {
  static displayName = FlightDetails.name;

  state = {};

  presentFlightDetails(request) {
    return Array.from(this.props.my_flights).map((flight) => {
      /* flight */
      if (flight.flight_id === this.props.clicked_flight_id) {
        if (request === 1) {
          return (
            <tr key={flight.flight_id}>
              <th scope="row">{flight.flight_id}</th>
              <td>{flight.company_name}</td>
              <td> {flight.passengers}</td>
              <td> {flight.longitude.toFixed(4)} </td>
              <td> {flight.latitude.toFixed(4)} </td>
              <td> {flight.is_external.toString()} </td>
            </tr>
          );
        } else if (request === 2) {
          return (
            <tr key={flight.flight_id}>
              <td>
                {this.props.clicked_flight_plan != null
                  ? this.getDepartureTime(1)
                  : null}
              </td>
              <td>
                {" "}
                {this.props.clicked_flight_plan != null
                  ? this.getDepartureTime(2)
                  : null}{" "}
              </td>
            </tr>
          );
        }
      }
      return <div></div>;
    });
  }

  getDepartureTime = (request) => {
    try {
      let initial_location = this.props.clicked_flight_plan.initial_location;
      let segments = this.props.clicked_flight_plan.segments;

      //console.log(initial_location);
      let date_string = initial_location.date_time;
      let departureDate = new Date(date_string);
      //console.log(departureDate.toDateString());
      //console.log(departureTime.getTime());
      if (request === 1) {
        return departureDate.toString();
      } else if (request === 2) {
        segments.map((segment) => {
          //departureDate.addSecs(segment.Span_Second);
          departureDate.setSeconds(
            departureDate.getSeconds() + segment.timespan_seconds
          );
        });
        return departureDate.toString();
      }
    } catch (error) {
      console.log(error);
    }
    return "check";
  };

  render() {
    return (
      <div>
        <Table bordered size="sm">
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
          <tbody>{this.presentFlightDetails(1)}</tbody>
        </Table>
        <Table bordered size="sm">
          <thead>
            <tr>
              <th>
                Departure Time{" "}
                <img
                  src={departures}
                  alt=""
                  border="3"
                  height="24"
                  width="24"
                />{" "}
              </th>
              <th>
                Arrival Time{" "}
                <img src={arrivals} alt="" border="3" height="24" width="24" />
              </th>
            </tr>
          </thead>
          <tbody>{this.presentFlightDetails(2)}</tbody>
        </Table>
      </div>
    );
  }
}

FlightDetails.propTypes = {
  clicked_flight_id: PropTypes.string.isRequired,
  my_flights: PropTypes.array.isRequired,
  clicked_flight_plan: PropTypes.object.isRequired,
};
