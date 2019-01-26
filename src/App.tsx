import * as React from 'react';
import Player from './components/Player/';
import Preset from './components/Preset';
import PresetExplorer from './components/PresetExplorer';
// import TestReduxComponent from './tmp-components/TestReduxComponent';
import TestReduxFunctionalComponent from './tmp-components/TestReduxFunctionalComponent';

class App extends React.Component {
  public render() {
    return(
      <div>
        <PresetExplorer />
        <TestReduxFunctionalComponent />
        <Preset />
        <Player />
      </div>
    );
  }
}

export default App;
