import React, { Component } from 'react';

export class Layout extends Component {
  render() {
    return (
      <div className="wrapper">
        <div>{this.props.children}</div>
        <footer>
          All Rights Reserved © 2020 Arye182 miriyungries
          <br />
          License: MIT
          <br /> Authors:{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Arye182">
            Arye182
          </a>{' '}
          ,
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/miriyungreis">
            miriyungreis
          </a>{' '}
          <br />
          The Project Repo In GitHub:{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/miriyungreis/FlightControlWebApp"
          >
            FlightControlWebApp
          </a>
        </footer>
      </div>
    );
  }
}
