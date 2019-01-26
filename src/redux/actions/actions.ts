import { AnyAction } from 'redux';
import { ActionTypes } from './actionTypes';


/**
 * ACTIONS
 * Objects that describe what should be done to the state.
 */

// ----------------------------------------------------------------------
// 'todo' related action generators
//

export function addTodo(text: string): AnyAction {
  return { type: ActionTypes.AddTodo, text }  // this is an action
}

export function toggleTodo(index: number): AnyAction {
  return { type: ActionTypes.ToggleTodo, index }  // this is an action
}
