import { combineReducers } from 'redux';
import AccountsReducer from './account/AccountsReducer.js';
import ShowManageAccountsReducer from './manage-accounts/ShowManageAccountsReducer.js';

const rootReducer = combineReducers({
  accounts: AccountsReducer,
  showManageAccounts: ShowManageAccountsReducer
});

export default rootReducer;
