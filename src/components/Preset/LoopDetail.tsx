import * as React from 'react';
// import IEntry from './IEntry';

const DEFAULT_ROUND_NUMBER = 1;

class LoopDetail extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      rounds: this.GetRounds(this.props.rounds)
    };
  }

  public render() {
    return (
      <div className="details loop-detail">{this.state.rounds} round{this.state.rounds === 1 ? '' : 's'}!</div>
    );
  }

  private GetRounds(rounds: number): number {
    if (rounds === undefined) {
      return DEFAULT_ROUND_NUMBER;
    }
    return rounds;
  }
}

export default LoopDetail;
