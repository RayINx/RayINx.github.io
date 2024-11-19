import React from 'react';
import './App.css';

// Main function App that will handle layout of everything else 
function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <LeftPanel />
        <RightPanel />
      </div>
      <Footer />
    </div>
  );
}

// Header and Footer component functions that are empty
function Header() {
  return (
    <header className="panel header-panel">
      <h1>Heading the Head</h1>
    </header>
  );
}

function Footer() {
  return (
    <div className="panel footer-panel">
      <h1>Footer foot foot</h1>
    </div>
  );
}

//****************************************************** */
// Left Panel to create button that allows for counting up the amount of times clicked 
class LeftPanel extends React.Component{
  constructor(props){
    super(props); // TBH Unsure why this is needed
    this.state = {clickCount: 0}; //Initialize a constructor to set clickcount to 0
  }
  handleClick = () => {
    this.setState((prevState) => ({
      clickCount: prevState.clickCount + 1, // thisState = prevState + 1
    }));
  };

  render(){
    return (
      <div className="panel left-panel">
        <h2>Click button here to update number</h2>
        <p>Number: {this.state.clickCount}</p>
        <button onClick={this.handleClick}>Click Here!</button> 
      </div>
    );
  }
}

// Right Panel that will display current real world time
class RightPanel extends React.Component{
  render(){
    return (
      <div className="panel right-panel">
        <h2>Need to get real world time and display here</h2>
      </div>
    );
  }
}

export default App;