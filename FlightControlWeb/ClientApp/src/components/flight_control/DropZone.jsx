import React, { Component } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";

// const api = axios.create({
//   baseURL: `http://ronyut4.atwebpages.com/ap2`,
// });
/*** Drop Zone style and logic - taken from react dz ***/
const AxiosError = require("axios-error");
const divStyle = {
  // backgroundColor: "blue",
  color: "blue",
};

export default class DropZone extends Component {
  constructor() {
    super();
    this.onDrop = (files) => {
      this.setState({ files: files, dragEntered: false });

      this.postFlight();
    };
    this.state = {
      files: [],
      style: "",
      dragEntered: false,
    };
  }

  postFlight = async () => {
    try {
      let res = await axios
        .post("/api/FlightPlan/", this.state.files[0])
        .then((res) => {
          console.log("POSTING FLIGHT PLAN: " + res.status + res.data);
          console.log(res);
          toast.success("New Flight Created");
        });
    } catch (error) {
      // Error 😨
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        toast.error("Error: " + error.response.data);
        toast.error("Error: " + error.response.status);
        toast.error("Error: " + error.response.headers);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        toast.error("Error: The request was made but no response was received");
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        toast.error("Error: " + error.message);
        console.log(error.message);
      }
      console.log(new AxiosError(error));
      toast.error(error);
    }
  };

  onDragEnter = () => {
    this.setState({ dragEntered: true });
  };

  onDragLeave = () => {
    this.setState({ dragEntered: false });
  };

  render() {
    let children;
    if (this.state.dragEntered) {
      children = (
        <div className="flights-container my-dropzone">
          <h4>Drag and Drop</h4>
          <img
            alt="description"
            src={require("../../images/the_drop_box_folder.ico")}
          />
          <img
            alt="description"
            src={require("../../images/the_drop_box_folder.ico")}
          />
          <img
            alt="description"
            src={require("../../images/the_drop_box_folder.ico")}
          />
          <img
            alt="description"
            src={require("../../images/the_drop_box_folder.ico")}
          />
        </div>
      );
    } else {
      children = this.props.children;
    }
    return (
      <Dropzone
        noClick={true}
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps({ className: "dropzone" })} style={divStyle}>
              <input {...getInputProps()} />
              {children}
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}
