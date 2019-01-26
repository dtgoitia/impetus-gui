import * as React from 'react';
import Player from './components/Player/';
import Preset from './components/Preset';
import TestReduxComponent from './tmp-components/TestReduxComponent';
import TestReduxFunctionalComponent from './tmp-components/TestReduxFunctionalComponent';

class App extends React.Component {
  public render() {
    return(
      <div>
        <TestReduxComponent />
        <TestReduxFunctionalComponent />
        <Preset />
        <Player />
      </div>
    );
  }
}

export default App;
