import React, { useMemo, Component } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Dropzone from "react-dropzone";
import styled from "styled-components";

const api = axios.create({
  baseURL: `http://ronyut4.atwebpages.com/ap2`,
});
/*** Drop Zone style and logic - taken from react dz ***/

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div``;

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
    let res = await api
      .post("/api/FlightPlan/", this.state.files[0])
      .then((res) => {
        console.log("POSTING FLIGHT PLAN: " + res.status + res.data);
        console.log(res);
      });
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
          <img src={require("../../images/the_drop_box_folder.ico")} />
          <img src={require("../../images/the_drop_box_folder.ico")} />
          <img src={require("../../images/the_drop_box_folder.ico")} />
          <img src={require("../../images/the_drop_box_folder.ico")} />
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
