import React, { Component } from "react";
import { Table } from "reactstrap";

export class ExternalFlights extends Component {
  static displayName = ExternalFlights.name;

  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>Flight ID</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">123456</th>
              <td>Swiss Air</td>
            </tr>
            <tr>
              <th scope="row">223654</th>
              <td>Turkish</td>
            </tr>
            <tr>
              <th scope="row">323654</th>
              <td>Larry</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
