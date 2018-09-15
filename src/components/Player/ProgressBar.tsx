import * as React from 'react';
import './ProgressBar.css';

class ProgressBar extends React.Component<any, any> {
  public render(): JSX.Element {
    const elapsedTime: number = this.props.elapsedTime;
    const presetDuration: number = this.props.preset[this.props.preset.length - 1].end;
    const elapsedStyle = {
      width: `${(elapsedTime / presetDuration) * 100}%`
    }
    return(
    <div id="progress-bar">
      <div id="elapsed" style={elapsedStyle}>&nbsp;</div>
    </div>
  );
  }
}

export default ProgressBar;
