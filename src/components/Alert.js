// src/components/Alert.js
import React, { Component } from 'react';

// Base Alert class component
class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.bgColor = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderWidth: "2px",
      borderStyle: "solid",
      fontWeight: "bolder",
      borderRadius: "7px",
      borderColor: this.color,
      textAlign: "center",
      fontSize: "12px",
      margin: "10px 0",
      padding: "10px"
    };
  }

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

// InfoAlert subclass
class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(0, 0, 255)'; // blue
    this.bgColor = 'rgb(220, 220, 255)'; // light blue
  }
}

// WarningAlert subclass
class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'orange';
    this.bgColor = 'rgb(255, 243, 205)'; // light orange
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      fontStyle: 'italic', // Custom style for WarningAlert
      borderWidth: "2px",
      borderStyle: "solid",
      fontWeight: "bolder",
      borderRadius: "7px",
      borderColor: this.color,
      textAlign: "center",
      fontSize: "12px",
      margin: "10px 0",
      padding: "10px"
    };
  }
}

// ErrorAlert subclass
class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red';
    this.bgColor = 'rgb(255, 220, 220)'; // light red
  }
}

export { InfoAlert, WarningAlert, ErrorAlert };
