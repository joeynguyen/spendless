import React from 'react';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from '../routes.js';
import '../app.css';


const Root = ({ store }) => {
  const history = syncHistoryWithStore(hashHistory, store);
  return (
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  );
};

export default Root;
