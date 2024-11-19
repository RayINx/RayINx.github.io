import React, { Component } from 'react';

class leftP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickCount: 0,
    };
  }

  handleClick = () => {
    this.setState((prevState) => ({
      clickCount: prevState.clickCount + 1,
    }));
  };

  render() {
    return (
      <leftP className="panel left-panel">
        <p>Button Clicked: {this.state.clickCount} times</p>
        <button onClick={this.handleClick}>Click Me!</button>
      </leftP>
    );
  }
}

export default leftP;