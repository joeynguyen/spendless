import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './app/Home.js';
import Overview from './overview/Overview.js';
import AccountDetail from './account/AccountDetail.js';

export default (
  <Route path="/" component={Home}>
    <IndexRoute component={Overview} />
    <Route path="account/:id" component={AccountDetail} />
  </Route>
);
