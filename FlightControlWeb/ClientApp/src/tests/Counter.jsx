import React, { Component } from "react";
import { Button } from "reactstrap";

class Counter extends Component {
  product = "i am a product";
  state = {
    count: 0,
    tags: ["tag1", "tag2", "tag3"],
  };

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }

  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags!</p>;
    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  handleIncrement = (product) => {
    console.log(product);
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <Button
          onClick={() => this.handleIncrement(this.product)}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </Button>
      </div>
    );
  }
}

export default Counter;
