import React, { Component } from "react";
import Counter from "./Counter";

class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
      { id: 5, value: 0 },
    ],
  };
  render() {
    return (
      <div className="wrapper">
        {this.state.counters.map((counter) => (
          <Counter key={counter.id} />
        ))}
      </div>
    );
  }
}

export default Counters;
