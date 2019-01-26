import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from 'src/redux/state';
import { ITodo } from 'src/redux/state/todo';

interface ITestReduxComponentProps {
  todos: ITodo[];
}

class TestReduxComponent extends React.Component<IState, any> {
  constructor(props: IState) {
    super(props);
    this.state = { a: 'a' };
  }
  public render(): JSX.Element {
    return (
      <div>
        <h1>Test Redux Component</h1>
        <p>This is my state:</p>
        { Object.keys(this.state).map((x: string, i: number) => <p key={i}>{x}: {this.state[x]}</p>) }
        <p>This is are the top level props:</p>
        { Object.keys(this.props).map((x: string, i: number) => <p key={i}>- {x}</p>) }
        <p>This is are the props.todos:</p>
        { Object.keys(this.props.todos).map((x: string, i: number) => <p key={i}>{x}: {this.props.todos[x].text}</p>) }
      </div>
    );
  }
}


function mapStateToProps(state: IState): ITestReduxComponentProps {  // TODO: find return type
  return state;
}

export default connect(mapStateToProps)(TestReduxComponent);
