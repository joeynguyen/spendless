import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App.js';
import HomePage from './containers/HomePage.js';
import AccountDetail from './account/AccountDetail.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="account/:id" component={AccountDetail} />
  </Route>
);
