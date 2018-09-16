import * as React from 'react';
import Player from './components/Player/';
import Preset from './components/Preset';

class App extends React.Component {
  public render() {
    return <div><Preset /><Player /></div>;
  }
}

export default App;
