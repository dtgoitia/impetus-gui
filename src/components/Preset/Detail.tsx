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
  reference: any;
}

const Detail = ({changer, data, reference}: IDetailDataProps) => {
  switch (data.type) {
    case 'loop':
      return(
        <LoopDetail rounds={data.rounds} editModeOn={data.editModeOn}
          reference={reference} changer={changer}/>
      );

    case 'work':
      return <WorkDetail time={data.time} pause={false} />;

    case 'rest':
      return <WorkDetail time={data.time} pause={false} />;

    default:
      throw new RangeError(`A detail can only be: 'loop', 'work', 'rest'`);
  }
};

export default Detail;
