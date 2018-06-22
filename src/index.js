import React from 'react';
import ReactDOM from 'react-dom';
import Root from './app/Root.jsx';
import registerServiceWorker from './registerServiceWorker';
import { configureStore, history } from './store/configureStore.js';

const store = configureStore();

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  const { registerObserver } = require('react-perf-devtool');
  console.log('Running registerObserver');
  registerObserver();
}

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
registerServiceWorker();
