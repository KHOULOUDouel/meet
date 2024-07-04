import React, { Component } from 'react';

// Base Alert class component
class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      fontSize: '14px' // Common style can be set here
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
    this.color = 'blue';
  }
}

// WarningAlert subclass
class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'orange';
  }

  getStyle = () => {
    return {
      color: this.color,
      fontStyle: 'italic' // Custom style for WarningAlert
    };
  }
}

// ErrorAlert subclass
class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red';
  }
}

export { InfoAlert, WarningAlert, ErrorAlert };
