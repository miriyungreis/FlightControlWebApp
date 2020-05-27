import React, { Component } from "react";
import PropTypes from "prop-types";
import { Marker } from "react-leaflet";
import L, { Icon } from "leaflet";

let iconString = `<svg height="512px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M438.8,320.6c-3.6-3.1-147.2-107.2-147.2-107.2c-0.2-0.2-0.4-0.4-0.5-0.5c-5.5-5.6-5.2-10.4-5.6-18.8c0,0-0.9-69-2.2-92  S270,64,256,64c0,0,0,0,0,0s0,0,0,0c-14,0-25.9,15-27.2,38s-2.2,92-2.2,92c-0.4,8.4-0.1,13.2-5.6,18.8c-0.2,0.2-0.4,0.4-0.5,0.5  c0,0-143.5,104.1-147.2,107.2s-9.2,7.8-9.2,18.2c0,12.2,3.6,13.7,10.6,11.6c0,0,140.2-39.5,145.4-40.8s7.9,0.6,8.3,7.5  s0.8,46.4,0.9,51s-0.6,4.7-2.9,7.4l-32,40.8c-1.7,2-2.7,4.5-2.7,7.3c0,0,0,6.1,0,12.4s2.8,7.3,8.2,4.9s32.6-17.4,32.6-17.4  c0.7-0.3,4.6-1.9,6.4-1.9c4.2,0,8-0.1,8.8,6.2c1.3,11.4,4.9,20.3,8.5,20.3c0,0,0,0,0,0s0,0,0,0c3.6,0,7.2-8.9,8.5-20.3  c0.7-6.3,4.6-6.2,8.8-6.2c1.8,0,5.7,1.6,6.4,1.9c0,0,27.2,15,32.6,17.4s8.2,1.4,8.2-4.9s0-12.4,0-12.4c0-2.8-1-5.4-2.7-7.3l-32-40.8  c-2.3-2.7-2.9-2.9-2.9-7.4s0.5-44.1,0.9-51s3.1-8.8,8.3-7.5s145.4,40.8,145.4,40.8c7.1,2.1,10.6,0.6,10.6-11.6  C448,328.4,442.5,323.7,438.8,320.6z"/></svg>`;
let iconUrl = encodeURI("data:image/svg+xml," + iconString).replace("#", "%23");
let clickedIconString = `<svg height="512px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path style="fill:#b00020;" d="M438.8,320.6c-3.6-3.1-147.2-107.2-147.2-107.2c-0.2-0.2-0.4-0.4-0.5-0.5c-5.5-5.6-5.2-10.4-5.6-18.8c0,0-0.9-69-2.2-92  S270,64,256,64c0,0,0,0,0,0s0,0,0,0c-14,0-25.9,15-27.2,38s-2.2,92-2.2,92c-0.4,8.4-0.1,13.2-5.6,18.8c-0.2,0.2-0.4,0.4-0.5,0.5  c0,0-143.5,104.1-147.2,107.2s-9.2,7.8-9.2,18.2c0,12.2,3.6,13.7,10.6,11.6c0,0,140.2-39.5,145.4-40.8s7.9,0.6,8.3,7.5  s0.8,46.4,0.9,51s-0.6,4.7-2.9,7.4l-32,40.8c-1.7,2-2.7,4.5-2.7,7.3c0,0,0,6.1,0,12.4s2.8,7.3,8.2,4.9s32.6-17.4,32.6-17.4  c0.7-0.3,4.6-1.9,6.4-1.9c4.2,0,8-0.1,8.8,6.2c1.3,11.4,4.9,20.3,8.5,20.3c0,0,0,0,0,0s0,0,0,0c3.6,0,7.2-8.9,8.5-20.3  c0.7-6.3,4.6-6.2,8.8-6.2c1.8,0,5.7,1.6,6.4,1.9c0,0,27.2,15,32.6,17.4s8.2,1.4,8.2-4.9s0-12.4,0-12.4c0-2.8-1-5.4-2.7-7.3l-32-40.8  c-2.3-2.7-2.9-2.9-2.9-7.4s0.5-44.1,0.9-51s3.1-8.8,8.3-7.5s145.4,40.8,145.4,40.8c7.1,2.1,10.6,0.6,10.6-11.6  C448,328.4,442.5,323.7,438.8,320.6z"/></svg>`;
let clickedIconUrl = encodeURI(
  "data:image/svg+xml," + clickedIconString
).replace("#", "%23");

let icon = L.icon({
  iconUrl: iconUrl,
  iconRetinaUrl: iconUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

let clicked_icon = L.icon({
  iconUrl: clickedIconUrl,
  iconRetinaUrl: clickedIconUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// let icon = new Icon({
//   iconUrl: require("../../images/plane_marker.svg"),
//   iconRetinaUrl: require("../../images/plane_marker.svg"),
//   iconSize: [40, 40],
//   iconAnchor: [20, 20],
// });

// let clicked_icon = new Icon({
//   iconUrl: require("../../images/‏‏plane_marker_clicked.svg"),
//   iconRetinaUrl: require("../../images/‏‏plane_marker_clicked.svg"),
//   iconSize: [40, 40],
//   iconAnchor: [20, 20],
// });

// export default class FlightMarker extends Component {
//   getIcon = (e) =>
//     this.props.clicked_flight_id === this.props.flight.flight_id
//       ? e.target.setIcon(clicked_icon)
//       : e.target.setIcon(icon);

export default class FlightMarker extends Component {
  state = {
    mouseOn: false,
  };
  getIcon = (e) =>
    this.props.clicked_flight_id === this.props.flight.flight_id ||
    this.state.mouseOn
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
        title={this.props.flight.flight_id}
        riseOnHover={true}
        onMouseOver={(e) => {
          this.setState({ mouseOn: true });
        }}
        onMouseOut={(e) => {
          this.setState({ mouseOn: false });
        }}
      ></Marker>
    );
  }
}

FlightMarker.propTypes = {
  flight: PropTypes.object.isRequired,
  clicked_flight_id: PropTypes.string.isRequired,
};
