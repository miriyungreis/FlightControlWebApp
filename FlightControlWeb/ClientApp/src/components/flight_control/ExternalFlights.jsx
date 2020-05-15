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
          <tbody></tbody>
        </Table>
      </div>
    );
  }
}
