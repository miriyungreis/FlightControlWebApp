import React, { Component } from "react";

export class Layout extends Component {
  render() {
    return (
      <div className="wrapper">
        <div>{this.props.children}</div>
        <footer>
          All Rights Reserved ©<br />
          <a href="https://github.com/Arye182">@Arye182</a>
          <br />
          <a href="https://github.com/miriyungreis">@miriyungreis</a>
        </footer>
      </div>
    );
  }
}
