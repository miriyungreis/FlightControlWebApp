import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import registerServiceWorker from "./registerServiceWorker";

import FlightList from "./components/flight_control/FlightList.jsx";
import FlightInput from "./components/flight_control/FlightInput.jsx";
import Counters from "./tests/Counters";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <App />

    {/* testing */}
    <div className="wrapper">
      <FlightInput />
      <FlightList />
      <Counters></Counters>
    </div>
    {/* end testing */}
  </BrowserRouter>,
  rootElement
);

registerServiceWorker();
