import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import mainReducer from './redux/reducers';  // which combines all the other reducers

import App from './App';

const store: Store = createStore(
  mainReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
