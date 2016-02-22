import { combineReducers } from 'redux';
import AccountsReducer from './account/AccountsReducer.js';
import AccountTransactionsReducer from './account/AccountTransactionsReducer.js';
import UploadedTransactionsReducer from './account/UploadedTransactionsReducer.js';
import ShowManageAccountsReducer from './manage-accounts/ShowManageAccountsReducer.js';
import ShowUnsavedWarningReducer from './account/ShowUnsavedWarningReducer.js';
import NextRoutePathReducer from './app/NextRoutePathReducer.js';

const rootReducer = combineReducers({
  accounts: AccountsReducer,
  accountTransactions: AccountTransactionsReducer,
  uploadedTransactions: UploadedTransactionsReducer,
  showManageAccounts: ShowManageAccountsReducer,
  unsavedWarningVisible: ShowUnsavedWarningReducer,
  nextRoutePath: NextRoutePathReducer,
});

export default rootReducer;
