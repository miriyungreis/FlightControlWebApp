import React, { Component } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";

/*** Drop Zone style and logic - taken from react dz ***/
export default class DropZone extends Component {
  state = {
    style: "",
    dragEntered: false,
  };

  onDrop = async ([file]) => {
    var reader = new FileReader();
    reader.onload = (e) => {
      var contents = e.target.result;
      this.postFlight(JSON.parse(contents));
    };
    reader.readAsText(file);
    this.setState({ dragEntered: false });
  };

  postFlight = async (contents) => {
    try {
      await axios.post("/api/FlightPlan/", contents).then((res) => {
        console.log("POSTING FLIGHT PLAN: " + res.status + res.data);
        console.log(res);
        toast.success("Posting New Flight!");
      });
    } catch (error) {
      this.props.errorHandle(error);
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
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              {children}
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}
