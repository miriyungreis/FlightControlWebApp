import React, { Component } from 'react';
import FlightMap from './flight_control/FlightMap.jsx';
import { FlightDetails } from './flight_control/FlightDetails.jsx';
import { MyFlights } from './flight_control/MyFlights.jsx';
import axios from 'axios';
import DropZone from './flight_control/DropZone.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

/*** The Home Page of App - The Dash - Board! ***/
export class Home extends Component {
  state = {
    getFlightsInterval: null,
    getLocalTimeInterval: null,
    date: '',
    clicked_flight_id: null,
    clicked_flight: [{}],
    my_flights: [],
    external_flights: [],
    clicked_flight_plan: null,
  };

  componentDidMount() {
    const getFlightsInterval = setInterval(this.getFlights, 3000);
    const getLocalTimeInterval = setInterval(this.getClock, 1000);
    this.setState(
      {
        date: new Date().toISOString().split('.').shift() + 'Z',
        getLocalTimeInterval: getLocalTimeInterval,
        getFlightsInterval: getFlightsInterval,
      },
      function () {
        console.log('i am gonna get flights!');
        this.getClock();
        this.getFlights();
      },
    );
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.getFlightsInterval);
    clearInterval(this.state.getLocalTimeInterval);
  }

  getClock = () => {
    this.setState({ date: new Date().toISOString().split('.').shift() + 'Z' });
  };

  /*** Server Requests - REST API ***/
  /* GET FLIGHTS relative to time */
  getFlights = async () => {
    try {
      await axios.get('/api/Flights?relative_to=' + this.state.date + '&sync_all').then((res) => {
        console.log('GET FLIGHTS: ' + res.status + ' ' + res.data);
        this.setState({ my_flights: res.data });
      });
    } catch (error) {
      this.errorHandle(error);
    }
  };

  /* GET FLIGHT PLAN */
  getFlightPlan = async () => {
    try {
      await axios.get('api/FlightPlan/' + this.state.clicked_flight_id).then((res) => {
        console.log('GETTING FLIGHT PLAN: ' + res.status + ' ' + res.data);
        this.setState({
          clicked_flight_plan: JSON.parse(JSON.stringify(res.data)),
        });
      });
    } catch (error) {
      this.errorHandle(error);
    }
  };

  /* DELETE FLIGHT */
  onDeleteFlightClick = async (flight_id) => {
    console.log('Deleting flight: ' + flight_id);
    try {
      await axios.delete('/api/Flights/' + flight_id).then((res) => {
        this.setState({ clicked_flight: null, clicked_flight_plan: null });
        console.log('DELETING FLIGHT PLAN: ' + res.status + res.data);
        toast.info('Deleting Flight ' + flight_id);
      });
    } catch (error) {
      this.errorHandle(error);
    }
  };

  /*** When clicking on flight either in map or in table ***/
  onFlightClick = (flight_id) => {
    this.setState({ clicked_flight_id: flight_id }, function () {
      if (this.state.clicked_flight_id != null) {
        this.getFlightPlan();
      } else {
        this.setState({ clicked_flight_plan: null });
      }
    });
  };

  onMapClick = () => {
    this.setState({ clicked_flight_id: null, clicked_flight_plan: null });
  };

  errorHandle = (error) => {
    // Error 😨
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      error.response.status === 400
        ? toast.error('Error in Request, Please Check Your JSON Format / Request Format!')
        : toast.error(
            'Error In Response From Server, Status Code: ' +
              error.response.status +
              ' Data: ' +
              error.response.data +
              'Headers: ' +
              error.response.headers,
          );

      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      toast.error('Error: The request was made but no response was received');
      console.log(error.request);
    } else {
      // Something happened in setting up the request and triggered an Error
      toast.error('Error: ' + error.message);
      console.log(error.message);
    }
    console.log(error);
    toast.error(error);
  };

  truncate(str, no_words) {
    return str.split(' ').splice(0, no_words).join(' ');
  }

  // the dashboard of the application - the main container
  render() {
    return (
      <div className="top-container">
        <ToastContainer position="top-center"></ToastContainer>
        <div className="map">
          <FlightMap
            my_flights={this.state.my_flights}
            onFlightClick={this.onFlightClick}
            onMapClick={this.onMapClick}
            clicked_flight_id={this.state.clicked_flight_id}
            clicked_flight_plan={this.state.clicked_flight_plan}
          ></FlightMap>
        </div>

        <div className="my-flights">
          <DropZone errorHandle={this.errorHandle}>
            <MyFlights
              my_flights={this.state.my_flights}
              onFlightClick={this.onFlightClick}
              clicked_flight_id={this.state.clicked_flight_id}
              onDeleteFlightClick={this.onDeleteFlightClick}
            ></MyFlights>
          </DropZone>
        </div>

        <div className="flight-data">
          <h4>Flight Details</h4>
          <p>The Time In UTC Right Now is : {this.state.date}</p>
          <FlightDetails
            current_date={this.state.date}
            clicked_flight_id={this.state.clicked_flight_id}
            my_flights={this.state.my_flights}
            clicked_flight_plan={this.state.clicked_flight_plan}
          ></FlightDetails>
        </div>
      </div>
    );
  }
}
