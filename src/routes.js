import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app/App.js';
import Home from './app/Home.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
);
