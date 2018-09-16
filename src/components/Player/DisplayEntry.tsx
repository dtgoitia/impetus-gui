import * as React from 'react';
import './DisplayEntry.css';
import { DisplayEntryStatus } from './DisplayEntryStatus';
import { IProcessedEntry } from './IProcessedEntry';

interface IDisplayEntryProps {
  status: number;
  entry: IProcessedEntry|null;
};

function getDisplayEntryStyle(status: number): string {
  switch (status) {
    case DisplayEntryStatus.Completed:
      return 'completed';
    case DisplayEntryStatus.Running:
      return 'running';
    case DisplayEntryStatus.Next:
      return 'next';
    default:
      return '';
  }
}

const DisplayEntry = ({entry, status}: IDisplayEntryProps): JSX.Element => {
  if (entry) {
    return(
      <div className={`display-entry ${getDisplayEntryStyle(status)}`}>
        &nbsp;{entry.description}
      </div>
    );
  }
  return <span />;
};

export default DisplayEntry;
