import * as React from 'react';
import { EntryType } from './EntryType';

const GetColorFromType = (type: string): string => {
  switch (type) {
    case EntryType.Loop:
      return 'Black';
    case EntryType.Rest:
      return 'LawnGreen';
    case EntryType.Work:
      return 'Red';
    default:
      return 'Black';
  }
}

export const EntryBar = ({entryType}: any) => {
  return(
    <div
      className="vertical-bar"
      style={{ backgroundColor: GetColorFromType(entryType) }}
    >&nbsp;</div>
  );
};
