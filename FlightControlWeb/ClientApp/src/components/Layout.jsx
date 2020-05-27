import React, { Component } from "react";
import { NavMenu } from "./NavMenu";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className="wrapper">
        <nav>
          <NavMenu />
        </nav>
        <div>{this.props.children}</div>
        <footer>All Rights Reserved - @Arye182 @miriyungreis ©</footer>
      </div>
    );
  }
}
