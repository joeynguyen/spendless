import React from 'react';
import ReactDOM from 'react-dom';
import Root from './app/Root.jsx';
import registerServiceWorker from './registerServiceWorker';
import { configureStore, history } from './store/configureStore.js';

const store = configureStore();

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
registerServiceWorker();
