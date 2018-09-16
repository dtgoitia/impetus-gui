import * as React from 'react';
import { IProcessedEntry } from './IProcessedEntry';
import './ProgressBar.css';

interface IProgressBarProps {
  elapsedTime: number;
  flatPreset: IProcessedEntry[];
};

const ProgressBar = ({elapsedTime, flatPreset}: IProgressBarProps): JSX.Element => {
  const presetDuration: number = flatPreset[flatPreset.length - 1].end;
  return(
    <div id="progress-bar">
      <div id="elapsed" style={{ width: `${(elapsedTime / presetDuration) * 100}%`}}>&nbsp;</div>
    </div>
  );
};

export default ProgressBar;
