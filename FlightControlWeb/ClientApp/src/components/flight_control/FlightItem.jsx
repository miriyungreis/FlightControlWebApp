import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import PropTypes from "prop-types";

export default class FlightItem extends Component {
  state = {
    clicked: false,
  };

  getStyle = () => {
    return {
      //background: this.state.clicked ? "#f4f4f4" : "white",
      padding: this.state.clicked ? "10px" : "none",
    };
  };

  deleteFlight = () => {
    console.log("the flight is deleted!");
  };

  render() {
    const { flight_id } = this.props.flight;
    return (
      <tr
        style={this.getStyle()}
        onClick={this.props.onFlightClick.bind(this, flight_id)}
      >
        <th scope="row">{this.props.flight.flight_id}</th>
        <td>{this.props.flight.company_name}</td>
        <td>
          <Button close onClick={this.deleteFlight} />
          {""}
        </td>
      </tr>
    );
  }
}

FlightItem.propTypes = {
  flight: PropTypes.object.isRequired,
};
