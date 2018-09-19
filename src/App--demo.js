import React, { Component } from 'react';
import PubSub from 'pubsub-js'

class App extends Component {
 // (0) default state
  state = {
    clickCount: 0
  }

  componentDidMount(){
    // (1) subscriber function
    PubSub.subscribe('updateState', (newState)=>{
      this.setState(newState)
    });

  }

  render() {
    return (
      <div className="App" id="app-container">
        <h1>The Incrementer</h1>
        <h3>Total Count</h3>
        <p>{this.state.clickCount}</p>

        {/* (2) pass top-level application state down as props */
        <Incrementer appState={this.state}/>

      </div>
    );
  }
}


class Incrementer {
  _handleClick(){
    {/*
      (4) access value on props.appState
    */}
    const newVal = this.props.appState.clickCount + 1

    {/*
      (5) publish 'updateState' event + pass new state value as data object
          .... subsriber function from (1) will be executed
    */}

    PubSub.publish('updateState', { clickCount : newVal })
  }

  render(){
    return <div>
      <button onClick={()=>{this._handleClick()}}> Add One ++ </button>
    </div>
  }
}

export default App
