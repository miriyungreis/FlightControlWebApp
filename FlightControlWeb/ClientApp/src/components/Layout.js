import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <nav>
          <NavMenu />
        </nav>
        <div id="content-wrap">
          <Container>{this.props.children}</Container>
        </div>
        <footer>This Is The Footer Of The App!</footer>
      </div>
    );
  }
}
