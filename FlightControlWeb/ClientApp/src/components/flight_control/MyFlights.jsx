import React, { useMemo, Component } from "react";
import { useDropzone } from "react-dropzone";
import { Table, Button } from "reactstrap";
import PropTypes from "prop-types";
import FlightItem from "./FlightItem";

/*** Drop Zone style and logic - taken from react dz ***/
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};
const activeStyle = {
  borderColor: "#2196f3",
};
const acceptStyle = {
  borderColor: "#00e676",
};
const rejectStyle = {
  borderColor: "#ff1744",
};
function StyledDropzone(props) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    // Note how this callback is never invoked if drop occurs on the inner dropzone
    onDrop: (acceptedFiles) => console.log(files),
  });
  // TODO accept only json files?
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <h6>Add Flight Plan! / Click</h6>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </div>
  );
}

/*** the component - my flights ***/
export class MyFlights extends Component {
  static displayName = MyFlights.name;

  renderMyFlightsTabelData() {
    return this.props.my_flights.map((flight) => {
      /* flight */

      return (
        <FlightItem
          key={flight.flight_id}
          flight={flight}
          onFlightClick={this.props.onFlightClick}
        />
      );
    });
  }

  // createFlight = async () => {
  //   let res = await api.post("/flight_1.json", {
  //     flight_id: "[1112225]",
  //     longitude: 33.244,
  //     latitude: 31.12,
  //     passengers: 300,
  //     company_name: "TurkishAirlines",
  //     date_time: "2020-12-26T23:56:21Z",
  //     is_external: false,
  //   });
  //   console.log(res);
  // };

  render() {
    return (
      <div>
        {/* the drop zone */}
        <StyledDropzone />
        <button onClick={this.createFlight}> Generate Flight! </button>
        {/* the table of flights - dynamic table */}
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
        {/* end of table */}
      </div>
    );
  }
}

MyFlights.propTypes = {
  my_flights: PropTypes.array.isRequired,
};
