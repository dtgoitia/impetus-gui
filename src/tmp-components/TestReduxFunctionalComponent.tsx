import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from 'src/redux/state';

const TestReduxFunctionalComponent: React.FC<IState> = (props: IState) => {
  return (
    <div>
      <h1>Test Redux Functional Component</h1>
      <p>This component doesn't have state</p>
      <p>This is are the top level props:</p>
      {
        Object.keys(props).map((prop: any, i: number) => {
          return <p key={i}>- {prop}: {JSON.stringify(prop)}</p>;
        })
      }
      <p>This is are the props.todos:</p>
    </div>
  );
}

function mapStateToProps(state: IState): IState {
  return state;
}

export default connect(mapStateToProps)(TestReduxFunctionalComponent);
