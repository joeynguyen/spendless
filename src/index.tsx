import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { registerObserver } from 'react-perf-devtool';
import Root from './app/Root.jsx';
import registerServiceWorker from './registerServiceWorker';
import { configureStore, history } from './store/configureStore.js';

const store = configureStore();

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  registerObserver();
}

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
