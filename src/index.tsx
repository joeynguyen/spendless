import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { registerObserver } from 'react-perf-devtool';
import Root from './app/Root.jsx';
import * as serviceWorker from './serviceWorker';
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
