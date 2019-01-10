import { Action, AnyAction, Reducer } from 'redux';
import { ActionTypes } from '../actionTypes';

interface ITodoAction extends Action {
  payload: any;
}

const initialState: any = {
  allIds: [],
  byIds: {}
};

export default function(state = initialState, action: ITodoAction): Reducer<{}, AnyAction> {
  switch (action.type) {
    case ActionTypes.AddTodo: {
      const { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            completed: false
          }
        }
      }
    }
    default:
      return state;
  };
}