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
        <div>
          <Container className="main-app">{this.props.children}</Container>
        </div>
        <footer>
          <h5>This Is The Footer Of The App!</h5>
        </footer>
      </div>
    );
  }
}
