import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import AccountPage from './containers/AccountPage';
// import CounterPage from './containers/CounterPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="account/:id" component={AccountPage} />
    {/* <Route path="/counter" component={CounterPage} /> */}
  </Route>
);
