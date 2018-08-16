import * as React from 'react';

const DEFAULT_ROUND_NUMBER = 1;

interface ILoopDetailProps {
  rounds?: number;
}

const LoopDetail = ({rounds = DEFAULT_ROUND_NUMBER}: ILoopDetailProps) => {
  return <div className="details loop-detail">{rounds} round{rounds === 1 ? '' : 's'}!</div>;
};

export default LoopDetail;
