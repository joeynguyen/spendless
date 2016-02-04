import { combineReducers } from 'redux';
import AccountReducer from './account/AccountReducer.js';
import ShowManageAccountsReducer from './manage-accounts/ShowManageAccountsReducer.js';

const rootReducer = combineReducers({
  accounts: AccountReducer,
  showManageAccounts: ShowManageAccountsReducer
});

export default rootReducer;
