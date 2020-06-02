import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { toast } from 'react-toastify';

/** *  Drop Zone style and logic - taken from react dz  ** */
export default class DropZone extends Component {
  state = {
    style: '',
    dragEntered: false,
  };

  onDrop = async ([file]) => {
    console.log('Starting On Drop!');
    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target.result;
      console.log('File Loaded!');
      let content = this.tryParseJsonFile(contents);
      content != null && this.postFlight(content);
    };
    reader.readAsText(file);
    this.setState({ dragEntered: false });
  };

  tryParseJsonFile(contents) {
    try {
      let content = JSON.parse(contents);
      return content;
    } catch (error) {
      toast.error(error);
      toast.error('json flight plan is not by formatt rules!');
      console.log(error);
      return null;
    }
  }

  postFlight = async (contents) => {
    try {
      await axios.post('/api/FlightPlan/', contents).then((res) => {
        console.log(`POSTING FLIGHT PLAN: ${res.status}${res.data}`);
        console.log(res);
        toast.success('Posting New Flight!');
      });
    } catch (error) {
      toast.error('problem in json file');
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
          <h4>
            Drag and Drop <br /> Please Drop Here <br /> A Valid JSON <br /> Flight Plan
          </h4>
        </div>
      );
    } else {
      children = this.props.children;
    }
    return (
      <Dropzone
        noClick
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              {children}
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}
