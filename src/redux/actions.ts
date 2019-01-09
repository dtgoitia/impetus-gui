import { ActionTypes } from './actionTypes';

export function addArticle(payload: string) {
  return { type: ActionTypes.AddTodo, payload }
}
