import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import AccountsReducer from './account/AccountsReducer.js';
import ActiveAccountIdReducer from './account/ActiveAccountIdReducer.js';
import AccountTransactionsReducer from './account/AccountTransactionsReducer.js';
import UploadedTransactionsReducer from './account/UploadedTransactionsReducer.js';
import ManageAccountsVisibleReducer from './manage-accounts/ManageAccountsVisibleReducer.js';
import ManageTransactionVisibleReducer from './account/ManageTransactionVisibleReducer.js';
import ActiveTransactionReducer from './account/ActiveTransactionReducer.js';
import UnsavedWarningVisibleReducer from './account/UnsavedWarningVisibleReducer.js';
import NextRoutePathReducer from './app/NextRoutePathReducer.js';

const rootReducer = combineReducers({
  accountTransactions: AccountTransactionsReducer,
  accounts: AccountsReducer,
  activeAccountId: ActiveAccountIdReducer,
  activeTransaction: ActiveTransactionReducer,
  manageAccountsVisible: ManageAccountsVisibleReducer,
  manageTransactionVisible: ManageTransactionVisibleReducer,
  nextRoutePath: NextRoutePathReducer,
  router: router,
  unsavedWarningVisible: UnsavedWarningVisibleReducer,
  uploadedTransactions: UploadedTransactionsReducer,
});

export default rootReducer;
