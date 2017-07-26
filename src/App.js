import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import TextMarkDown from './TextMarkDown';

const TMStyle = {
  marginLeft: '3em',
  display: 'inline-block',
  width: 900
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar title='Admin'></AppBar>
          <div style={TMStyle}>
            <TextMarkDown></TextMarkDown>
          </div>
      </div>
    );
  }
}

export default App;
