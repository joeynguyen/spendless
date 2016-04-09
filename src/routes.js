import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppContainer from './app/AppContainer.js';
import Overview from './overview/Overview.js';
import AccountDetailsContainer from './account/AccountDetailsContainer.js';
import HelpContent from './help/HelpContent.js';

export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={Overview} />
    <Route path="help" component={HelpContent} />
    <Route path="account/:id" component={AccountDetailsContainer} />
  </Route>
);
