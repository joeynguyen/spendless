import { combineReducers } from 'redux';
import AccountsReducer from './account/AccountsReducer.js';
import ActiveAccountReducer from './account/ActiveAccountReducer.js';
import AccountTransactionsReducer from './account/AccountTransactionsReducer.js';
import ShowManageAccountsReducer from './manage-accounts/ShowManageAccountsReducer.js';

const rootReducer = combineReducers({
  accounts: AccountsReducer,
  activeAccount: ActiveAccountReducer,
  accountTransactions: AccountTransactionsReducer,
  showManageAccounts: ShowManageAccountsReducer
});

export default rootReducer;
