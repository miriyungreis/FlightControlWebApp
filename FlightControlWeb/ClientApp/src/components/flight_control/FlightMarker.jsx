import React, { Component } from "react";
import PropTypes from "prop-types";
import { Marker } from "react-leaflet";
import { Icon } from "leaflet";

let icon = new Icon({
  iconUrl: require("../../images/plane_marker.svg"),
  iconRetinaUrl: require("../../images/plane_marker.svg"),
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

let clicked_icon = new Icon({
  iconUrl: require("../../images/‏‏plane_marker_clicked.svg"),
  iconRetinaUrl: require("../../images/‏‏plane_marker_clicked.svg"),
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

export default class FlightMarker extends Component {
  state = {
    flight: {},
    clicked_flight_id: "",
  };

  constructor(props) {
    super();
    this.state.flight = props.flight;
    this.state.clicked_flight_id = props.clicked_flight_id;
  }

  getIcon = () =>
    this.props.clicked_flight_id === this.props.flight.flight_id
      ? clicked_icon
      : icon;

  render() {
    const { flight_id } = this.props.flight;
    return (
      <Marker
        icon={this.getIcon()}
        onClick={this.props.onFlightClick.bind(this, flight_id)}
        key={this.props.flight.flight_id}
        position={[this.props.flight.latitude, this.props.flight.longitude]}
      ></Marker>
    );
  }
}

FlightMarker.propTypes = {
  flight: PropTypes.object.isRequired,
  clicked_flight_id: PropTypes.string.isRequired,
};
