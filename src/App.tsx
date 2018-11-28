import * as React from 'react';
import Player from './components/Player';
import Preset from './components/Preset';
import PresetExplorer from './components/PresetExplorer';
import Sidebar from './components/Sidebar';
// import TestReduxComponent from './tmp-components/TestReduxComponent';
import TestReduxFunctionalComponent from './tmp-components/TestReduxFunctionalComponent';

import './App.css';

class App extends React.Component {
  public render(): JSX.Element {
    return (
      <div className={'layout'}>
        <Sidebar />
        <PresetExplorer />
        <TestReduxFunctionalComponent />
        <Preset />
        <Player />
      </div>
    );
  }
}

export default App;
