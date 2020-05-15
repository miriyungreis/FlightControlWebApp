import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout.jsx";
import { Home } from "./components/Home.jsx";
import { About } from "./components/About.jsx";

import "./css/custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Layout>
    );
  }
}
