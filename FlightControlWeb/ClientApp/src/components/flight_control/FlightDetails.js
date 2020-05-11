import React, { Component } from "react";

export class FlightDetails extends Component {
  static displayName = FlightDetails.name;

  state = {
    loading: true,
  };

  async componentDidMount() {
    const url = "https://api.randomuser.me/";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ person: data.results[0], loading: false });
  }

  render() {
    return (
      <div>
        {this.state.loading || !this.state.person ? (
          <div>loading...</div>
        ) : (
          <div>
            <div> {this.state.person.name.title}</div>
            <div> {this.state.person.name.first}</div>
            <div> {this.state.person.name.last}</div>
            <div> {this.state.person.phone}</div>
            <img src={this.state.person.picture.large} />
          </div>
        )}
      </div>
    );
  }
}
