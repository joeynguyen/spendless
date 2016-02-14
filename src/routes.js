import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app/App.js';
import Home from './app/Home.js';
import AccountDetail from './account/AccountDetail.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="account/:id" component={AccountDetail} />
  </Route>
);
