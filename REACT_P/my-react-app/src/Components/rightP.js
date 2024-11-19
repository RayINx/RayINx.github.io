import React, { Component } from 'react';

class RightPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date().toLocaleTimeString(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.updateTime(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  updateTime() {
    this.setState({
      currentTime: new Date().toLocaleTimeString(),
    });
  }

  render() {
    return (
      <div className="panel right-panel">
        <p>Current Time: {this.state.currentTime}</p>
      </div>
    );
  }
}

export default RightPanel;