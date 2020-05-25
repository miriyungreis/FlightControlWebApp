import React, { Component } from "react";
import { Map, TileLayer, Polyline, L } from "react-leaflet";
import FlightMarker from "./FlightMarker";
import PropTypes from "prop-types";

export default class FlightMap extends Component {
  constructor(props) {
    super(props);
  }

  loadFlightsOnMap() {
    return Array.from(this.props.my_flights).map((flight) => {
      /* flight */
      return (
        <FlightMarker
          key={flight.flight_id}
          flight={flight}
          onFlightClick={this.props.onFlightClick}
          clicked_flight_id={this.props.clicked_flight_id}
        />
      );
    });
  }

  getFlightPolyline = () => {
    let polyline = [];
    try {
      let initial_location = this.props.clicked_flight_plan.initial_location;
      let segments = this.props.clicked_flight_plan.segments;
      polyline.push([initial_location.latitude, initial_location.longitude]);
      segments.map((segment) => {
        polyline.push([segment.latitude, segment.longitude]);
      });
      return polyline;
    } catch (error) {
      console.log(error);
      return polyline;
    }
  };

  render() {
    return (
      <Map
        center={[0, 0]}
        zoom={2}
        onclick={this.props.onFlightClick.bind(this, null)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {this.loadFlightsOnMap()}
        {this.props.clicked_flight_plan != null ? (
          <Polyline color="lime" positions={this.getFlightPolyline()} />
        ) : null}
      </Map>
    );
  }
}

FlightMap.propTypes = {
  my_flights: PropTypes.array.isRequired,
  clicked_flight_id: PropTypes.string.isRequired,
  clicked_flight_plan: PropTypes.object.isRequired,
};
