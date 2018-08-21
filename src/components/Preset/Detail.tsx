import * as React from 'react';
import LoopDetail from './LoopDetail';
import WorkDetail from './WorkDetail';

// TODO: implement a checkbox or similar to handle "pause" property
// and pass it state to Preset component.

interface IDetailDataProps {
  changer: any; // TODO: replace any for Function
  data: {
    editModeOn: boolean;
    rounds?: number;
    pause?: boolean;
    time?: number;
    type: string;
  };
  editModeOn: boolean;
}

const Detail = ({ changer, data, editModeOn }: IDetailDataProps) => {
  switch (data.type) {
    case 'loop':
      return <LoopDetail changer={changer} editModeOn={editModeOn} rounds={data.rounds} />;

    case 'work':
      return <WorkDetail time={data.time} pause={false} />;

    case 'rest':
      return <WorkDetail time={data.time} pause={false} />;

    default:
      throw new RangeError(`A detail can only be: 'loop', 'work', 'rest'`);
  }
};

export default Detail;
