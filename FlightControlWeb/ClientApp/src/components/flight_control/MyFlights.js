import React, { Component } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { Table } from "reactstrap";

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

const Container = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-width: 5px;
  border-radius: 5px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

function StyledDropzone(props) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: "image/*" });

  return (
    <div className="container">
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <p>Add Flight Plan!</p>
        <p>Click / Drag</p>
      </Container>
    </div>
  );
}

export class MyFlights extends Component {
  static displayName = MyFlights.name;

  handleOnDrop = () => {};

  render() {
    return (
      <div>
        <StyledDropzone></StyledDropzone>
        <Table>
          <thead>
            <tr>
              <th>Flight ID</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">123456</th>
              <td>Swiss Air</td>
            </tr>
            <tr>
              <th scope="row">223654</th>
              <td>Turkish</td>
            </tr>
            <tr>
              <th scope="row">323654</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">323654</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">323654</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">323654</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">323654</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">323654</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">323654</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">323654</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">323654</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">323654</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">323654</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">323654</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">323654</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">323654</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">323654</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">323654</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">323654</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">323654</th>
              <td>Larry</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
