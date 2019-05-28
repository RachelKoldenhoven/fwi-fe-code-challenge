import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.scss';
import App from './App';
import rootReducer from './appState/index';
import * as serviceWorker from './serviceWorker';
import {
  createBrowserHistory,
  routerMiddleware as createRouterMiddleware,
  startListener,
} from 'redux-first-routing';

// routing: https://github.com/mksarge/redux-first-routing
const history = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(history);

// composeEnhancers: https://chariotsolutions.com/blog/post/redux-middleware-and-enhancers-getting-redux-to-log-debug-and-process-async-work/
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(routerMiddleware, thunk))
);

startListener(history, store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
