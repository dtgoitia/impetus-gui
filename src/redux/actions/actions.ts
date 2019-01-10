import { AnyAction } from 'redux';
import { ActionTypes } from './actionTypes';

/*
 * 'todo' related action generators
 */

export function addTodo(text: string): AnyAction {
  return { type: ActionTypes.AddTodo, text }  // this is an action
}

export function toggleTodo(index: number): AnyAction {
  return { type: ActionTypes.ToggleTodo, index }  // this is an action
}
