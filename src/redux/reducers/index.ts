import { combineReducers } from 'redux';
import todos from './todos';


// Combine all the other reducers in a single reducer.
export default combineReducers({
  todos
});
