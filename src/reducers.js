import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer as router } from 'react-router-redux';
import AccountsReducer from './account/AccountsReducer.js';
import ActiveAccountIdReducer from './account/ActiveAccountIdReducer.js';
import AccountTransactionsReducer from './account/AccountTransactionsReducer.js';
import UploadedTransactionsReducer from './account/UploadedTransactionsReducer.js';
import ManageTransactionsListFormReducer from './account/ManageTransactionsListFormReducer.js';
import ManageAccountsVisibleReducer from './manage-accounts/ManageAccountsVisibleReducer.js';
import EditAccountFormReducer from './manage-accounts/EditAccountFormReducer.js';
import ManageTransactionVisibleReducer from './account/ManageTransactionVisibleReducer.js';
import ActiveTransactionReducer from './account/ActiveTransactionReducer.js';
import UnsavedWarningVisibleReducer from './account/UnsavedWarningVisibleReducer.js';
import NextRoutePathReducer from './app/NextRoutePathReducer.js';

const rootReducer = combineReducers({
  router: router,
  accounts: AccountsReducer,
  accountTransactions: AccountTransactionsReducer,
  activeAccountId: ActiveAccountIdReducer,
  activeTransaction: ActiveTransactionReducer,
  uploadedTransactions: UploadedTransactionsReducer,
  manageAccountsVisible: ManageAccountsVisibleReducer,
  manageTransactionVisible: ManageTransactionVisibleReducer,
  unsavedWarningVisible: UnsavedWarningVisibleReducer,
  nextRoutePath: NextRoutePathReducer,
  form: formReducer.plugin({
    EditAccount: EditAccountFormReducer,
    ManageTransactionsList: ManageTransactionsListFormReducer
  }),
});

export default rootReducer;
