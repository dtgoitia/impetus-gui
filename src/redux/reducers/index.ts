import { Reducer } from 'react';
import { combineReducers, AnyAction } from 'redux';
import { ActionTypes } from '../actions/actionTypes';
import { IState } from '../state';
import { ITodo } from '../state/todo';

/**
 * REDUCERS
 * Pure functions which take the previous state and an action, and return the new state
 * (prevState, action) => currentState
 */

// ----------------------------------------------------------------------
// 'todos' related reducers

const todosInitialState: ITodo[] = [
  {
    text: 'This is the default to-do',
    completed: false
  },
  {
    text: 'This is the second to-do',
    completed: true
  }
];

function addTodo(state: ITodo[], action: AnyAction): ITodo[] {
  return [
    ...state,
    {
      text: action.text,
      completed: false
    }
  ];
}

function togglTodo(todoState: ITodo[], action: AnyAction): ITodo[] {
  return todoState
    .map((todo: ITodo, index: number) => {
      if (index === action.index) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });
}

// Main reducer for 'todos'
function todos(todosState = todosInitialState, action: AnyAction): ITodo[] {
  switch (action.type) {
    case ActionTypes.AddTodo:
      return addTodo(todosState, action);  // update state to add a todo
    case ActionTypes.ToggleTodo:
      return togglTodo(todosState, action);
    default:
      return todosState;
  }
}

// 'todos' related reducers
// ----------------------------------------------------------------------

// Combine all the reducers in a single reducer.
const todoApp: Reducer<IState, AnyAction> = combineReducers({
  todos
});

// Expose a single god-reducer which knows how to handle all the actions
export default todoApp;
