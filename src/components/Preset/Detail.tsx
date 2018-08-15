import * as React from 'react';
// import IEntry from './IEntry';
import LoopDetail from './LoopDetail';
import WorkDetail from './WorkDetail';

class Detail extends React.Component<any, any> {
  public render() {
    switch (this.props.data.type) {
      case 'loop':
        return <LoopDetail rounds={this.props.data.rounds} />;

      case 'work':
        return <WorkDetail time={this.props.data.time} pause={false} />;

      case 'rest':
        return <WorkDetail time={this.props.data.time} pause={false} />;

      default:
        throw new RangeError(`A detail can only be: 'loop', 'work', 'rest'`);
    }
  }
}

export default Detail;
