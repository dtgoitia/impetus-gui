import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import { addTodo } from './redux/actions/actions';
import mainReducer from './redux/reducers';  // which combines all the other reducers

import App from './App';

const store: Store = createStore(mainReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
//tslint:disable
console.log(store.getState());
store.dispatch(addTodo('my first todo!'));
console.log(store.getState());

registerServiceWorker();
