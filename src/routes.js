import React from 'react';
import { Switch, Route } from 'react-router';
import AppContainer from './app/AppContainer.jsx';
import Overview from './overview/Overview.jsx';
import AccountPageContainer from './account/AccountPageContainer.jsx';
import HelpContent from './help/HelpContent.jsx';

export default () => (
  <AppContainer>
    <Switch>
      <Route exact path="/help" component={HelpContent} />
      <Route exact path="/account/:id" component={AccountPageContainer} />
      <Route exact path="/" component={Overview} />
    </Switch>
  </AppContainer>
);
