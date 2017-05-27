import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppContainer from './app/AppContainer.jsx';
import Overview from './overview/Overview.jsx';
import AccountPageContainer from './account/AccountPageContainer.jsx';
import HelpContent from './help/HelpContent.jsx';

export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={Overview} />
    <Route path="help" component={HelpContent} />
    <Route path="account/:id" component={AccountPageContainer} />
  </Route>
);
