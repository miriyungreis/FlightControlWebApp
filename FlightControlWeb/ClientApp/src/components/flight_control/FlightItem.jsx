import React, { Component } from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

export default class FlightItem extends Component {
  state = {
    flight: {},
    clicked_flight_id: "",
  };

  constructor(props) {
    super(props);
    this.state.flight = props.flight;
    this.state.clicked_flight_id = props.clicked_flight_id;
  }

  getStyle = () => {
    return {
      //background: this.state.clicked ? "#f4f4f4" : "white",
      border:
        this.props.clicked_flight_id === this.props.flight.flight_id
          ? "thick solid #0000FF"
          : "none",
    };
  };

  render() {
    const { flight_id } = this.props.flight;
    //console.log("the flight id of the current plan is: " + flight_id);
    const { is_external } = this.props.flight;
    return (
      <tr style={this.getStyle()} key={this.props.flight.flight_id}>
        <th
          scope="row"
          onClick={this.props.onFlightClick.bind(this, flight_id)}
        >
          {this.props.flight.flight_id}
        </th>
        <td onClick={this.props.onFlightClick.bind(this, flight_id)}>
          {this.props.flight.company_name}
        </td>
        {!is_external && (
          <td>
            <Button
              close
              onClick={this.props.onDeleteFlightClick.bind(this, flight_id)}
            />
          </td>
        )}
      </tr>
    );
  }
}

FlightItem.propTypes = {
  flight: PropTypes.object.isRequired,
  clicked_flight_id: PropTypes.string.isRequired,
};
