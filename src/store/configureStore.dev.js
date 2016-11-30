import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';

import rootReducer from '../reducers';
import * as appActions from '../app/AppActions.js';
import * as accountsActions from '../account/AccountsActions.js';
import * as transactionsActions from '../account/TransactionsActions.js';
import * as manageAccountsActions from '../manage-accounts/ManageAccountsActions.js';

const actionCreators = {
  ...appActions,
  ...accountsActions,
  ...manageAccountsActions,
  ...transactionsActions,
  push,
};

const logger = createLogger({
  level: 'info',
  collapsed: true,
});

const router = routerMiddleware(hashHistory);

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionCreators }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, router, logger),
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers.js', () =>
      store.replaceReducer(require('../reducers.js')) // eslint-disable-line global-require
    );
  }

  return store;
}
