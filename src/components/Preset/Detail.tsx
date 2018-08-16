import * as React from 'react';
import LoopDetail from './LoopDetail';
import WorkDetail from './WorkDetail';

// TODO: implement a checkbox or similar to handle "pause" property
// and pass it state to Preset component.

interface IDetailDataProps {
  data: {
    type: string;
    rounds?: number;
    time?: number;
    pause?: boolean;
  };
}

const Detail = ({data}: IDetailDataProps) => {
  switch (data.type) {
    case 'loop':
      return <LoopDetail rounds={data.rounds} />;

    case 'work':
      return <WorkDetail time={data.time} pause={false} />;

    case 'rest':
      return <WorkDetail time={data.time} pause={false} />;

    default:
      throw new RangeError(`A detail can only be: 'loop', 'work', 'rest'`);
  }
};

export default Detail;
