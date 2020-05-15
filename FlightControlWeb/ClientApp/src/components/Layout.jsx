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
        <section>
          <div>{this.props.children}</div>
        </section>

        <footer>Arye 182 ©</footer>
      </div>
    );
  }
}
