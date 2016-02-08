import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { Router } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes.js';
import reducers from './reducers.js';
import './app.css';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

// Needed for material-ui functionality
// Can go away when react 1.0 release
injectTapEventPlugin();

render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  // require('./createDevToolsWindow')(store);
}
