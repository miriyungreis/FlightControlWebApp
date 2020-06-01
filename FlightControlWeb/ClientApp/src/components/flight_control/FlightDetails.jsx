import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import departures from "../../images/departures.svg";
import arrivals from "../../images/arrivals.svg";
import { toast } from "react-toastify";

export class FlightDetails extends Component {
  static displayName = FlightDetails.name;

  state = {
    departureTime: null,
    arrivalTime: null,
    currentTime: null,
  };

  truncate(str, no_words) {
    return str.split(" ").splice(0, no_words).join(" ");
  }

  presentFlightDetailsTop() {
    return Array.from(this.props.my_flights).map((flight) => {
      /* flight */
      if (flight.flight_id === this.props.clicked_flight_id) {
        return (
          <tr key={flight.flight_id}>
            <th scope="row">{flight.flight_id}</th>
            <td>{flight.company_name}</td>
            <td> {flight.passengers}</td>
            <td>
              {" "}
              {flight.latitude.toFixed(4) +
                " / " +
                flight.longitude.toFixed(4)}{" "}
            </td>

            <td> {flight.is_external.toString()} </td>
          </tr>
        );
      }
      return <div></div>;
    });
  }

  presentFlightDetailsBottom() {
    return Array.from(this.props.my_flights).map((flight) => {
      /* flight */
      if (flight.flight_id === this.props.clicked_flight_id) {
        return (
          <tbody>
            <tr key={flight.flight_id}>
              <td>
                {this.props.clicked_flight_plan != null
                  ? "Time(UTC): " + this.getDepartureTime(1)
                  : null}
              </td>
              <td>
                {this.props.clicked_flight_plan != null
                  ? "Time(UTC): " + this.getDepartureTime(2)
                  : null}
              </td>
            </tr>
            <tr key={flight.flight_id}>
              <td>
                {" "}
                {this.props.clicked_flight_plan != null
                  ? "At (Lat/Long): " +
                    this.props.clicked_flight_plan.initial_location.latitude.toFixed(
                      4
                    ) +
                    "/" +
                    this.props.clicked_flight_plan.initial_location.longitude.toFixed(
                      4
                    )
                  : null}{" "}
              </td>
              <td>
                {" "}
                {this.props.clicked_flight_plan != null
                  ? "At (Lat/Long): " + this.getArrivalLocation()
                  : null}{" "}
              </td>
            </tr>
          </tbody>
        );
      }
      return <div></div>;
    });
  }

  getDepartureTime = (request) => {
    try {
      let initial_location = this.props.clicked_flight_plan.initial_location;
      let segments = this.props.clicked_flight_plan.segments;
      let date_string = initial_location.date_time;
      let departureDate = new Date(date_string);
      if (request === 1) {
        return this.truncate(departureDate.toString(), 5);
      } else if (request === 2) {
        segments.map((segment) => {
          departureDate.setSeconds(
            departureDate.getSeconds() + segment.timespan_seconds
          );
        });
        return this.truncate(departureDate.toString(), 5);
      }
    } catch (error) {
      console.log(error);
      toast.error("Could Not Calculate Times...");
    }
    toast.error("Could Not Calculate Times...");
    return "Err...";
  };

  getArrivalLocation = () => {
    let segments = this.props.clicked_flight_plan.segments;
    let length = segments.length;
    let arrivalPlace =
      segments[length - 1].latitude.toFixed(4) +
      "/" +
      segments[length - 1].longitude.toFixed(4);
    return arrivalPlace;
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
              <th>Current Position (Lat/Long)</th>
              <th>External?</th>
            </tr>
          </thead>
          <tbody>{this.presentFlightDetailsTop()}</tbody>
        </Table>
        <Table bordered size="sm">
          <thead>
            <tr>
              <th>
                Departure{" "}
                <img
                  src={departures}
                  alt=""
                  border="3"
                  height="24"
                  width="24"
                />{" "}
              </th>
              <th>
                Arrival{" "}
                <img src={arrivals} alt="" border="3" height="24" width="24" />
              </th>
            </tr>
          </thead>
          {this.presentFlightDetailsBottom()}
        </Table>
      </div>
    );
  }
}

FlightDetails.propTypes = {
  clicked_flight_id: PropTypes.string.isRequired,
  my_flights: PropTypes.array.isRequired,
  clicked_flight_plan: PropTypes.object.isRequired,
  current_date: PropTypes.string.isRequired,
};
