import React, { useMemo, Component } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Table, Button } from "reactstrap";

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

/*** API creation using AXIOS (for react) ***/
const api = axios.create({
  baseURL: `http://127.0.0.1:5500/ClientApp/src/tests/flights/`,
});

/*** the component - my flights ***/
export class MyFlights extends Component {
  static displayName = MyFlights.name;

  state = {
    my_flights: [],
  };

  constructor() {
    super();
    this.getFlights();
  }

  renderMyFlightsTabelData() {
    return this.state.my_flights.map((flight) => {
      /* flight */

      const { flight_id, company_name } = flight;
      return (
        <tr key={flight_id}>
          <th scope="row">{flight_id}</th>
          <td>{company_name}</td>
        </tr>
      );
    });
  }

  getFlights = async () => {
    let res = await api.get("/flight_1.json").then((res) => {
      console.log(res.data);
      this.setState({ my_flights: res.data });
    });
  };

  createFlight = async () => {
    let res = await api.post("/flight_1.json", {
      flight_id: "[1112225]",
      longitude: 33.244,
      latitude: 31.12,
      passengers: 300,
      company_name: "TurkishAirlines",
      date_time: "2020-12-26T23:56:21Z",
      is_external: false,
    });
    console.log(res);
  };

  render() {
    return (
      <div>
        {/* the drop zone */}
        <StyledDropzone />
        <button onClick={this.createFlight}> Generate Flight! </button>
        {/* the table of flights - dynamic table */}
        <Table>
          <thead>
            <tr>
              <th>Flight ID</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>{this.renderMyFlightsTabelData()}</tbody>
        </Table>
        {/* end of table */}
      </div>
    );
  }
}
