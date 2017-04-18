import React, { Component } from 'react';
import MazeConfigControl from './controls/mazeConfigControl';

class App extends Component {
  render() {
    return (
      <div>
        <MazeConfigControl />,
        <MazeConfigControl type='ascii' />
      </div>
    );
  }
}

export default App;
