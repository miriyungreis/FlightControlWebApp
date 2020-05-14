import React, { useMemo, Component } from "react";
import { useDropzone } from "react-dropzone";
import { Table } from "reactstrap";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function StyledDropzone(props) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    // Note how this callback is never invoked if drop occurs on the inner dropzone
    onDrop: (acceptedFiles) => console.log(files),
  });
  // TODO accept only json files?
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <h6>Add Flight Plan! / Click</h6>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </div>
  );
}

export class MyFlights extends Component {
  static displayName = MyFlights.name;

  render() {
    return (
      <div>
        <StyledDropzone />
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
