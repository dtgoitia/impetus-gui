import * as React from 'react';

const DEFAULT_ROUND_NUMBER = 1;

interface ILoopDetailProps {
  editModeOn: boolean;
  changer: any;
  reference: any;
  rounds?: number;
}

const LoopDetail = ({changer, editModeOn, reference, rounds = DEFAULT_ROUND_NUMBER}: ILoopDetailProps) => {
  if (editModeOn) {
    return(
      <div className="details loop-detail">
        <input type="number" value={rounds} ref={reference} onChange={changer}/>
        round{rounds === 1 ? '' : 's'}!
      </div>
    );
  }
  return <div className="details loop-detail">{rounds} round{rounds === 1 ? '' : 's'}!</div>;
};

export default LoopDetail;
