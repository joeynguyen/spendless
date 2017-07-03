import React from 'react';
import { render } from 'react-dom';
import { AppContainer as HotReloadContainer } from 'react-hot-loader';

import Root from './app/Root.jsx';
import { configureStore, history } from './store/configureStore.js';

const store = configureStore();

render(
  <HotReloadContainer>
    <Root store={store} history={history} />
  </HotReloadContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./app/Root', () => {
    const NextRoot = require('./app/Root'); // eslint-disable-line global-require
    render(
      <HotReloadContainer>
        <NextRoot store={store} history={history} />
      </HotReloadContainer>,
      document.getElementById('root')
    );
  });
}
