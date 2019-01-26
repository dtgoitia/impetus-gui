import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from 'src/redux/state';
import { ITodo } from 'src/redux/state/todo';


interface ITestReduxFunctionalComponentProps {
  todos: ITodo[];
}

const TestReduxFunctionalComponent: React.SFC<ITestReduxFunctionalComponentProps> = (props) => {
  return (
    <div>
      <h1>Test Redux Functional Component</h1>
      <p>This component doesn't have state</p>
      <p>This is are the top level props:</p>
      { Object.keys(props).map((x: string, i: number) => <p key={i}>- {x}</p>) }
      <p>This is are the props.todos:</p>
      { Object.keys(props.todos).map((x: string, i: number) => <p key={i}>{x}: {props.todos[x].text}</p>) }
    </div>
  );
}

function mapStateToProps(state: IState): ITestReduxFunctionalComponentProps {
  return state;
}

export default connect(mapStateToProps)(TestReduxFunctionalComponent);
