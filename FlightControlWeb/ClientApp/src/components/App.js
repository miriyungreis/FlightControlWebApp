import React, { Component } from "react";
import { Layout } from "../components/Layout.jsx";
import { Home } from "../components/Home.jsx";
import "../css/custom.css";

class App extends Component {
  render() {
    return (
      <Layout>
        <Home />
      </Layout>
    );
  }
}
export default App;
