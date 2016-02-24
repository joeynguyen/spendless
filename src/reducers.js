import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AccountsReducer from './account/AccountsReducer.js';
import AccountTransactionsReducer from './account/AccountTransactionsReducer.js';
import UploadedTransactionsReducer from './account/UploadedTransactionsReducer.js';
import ShowManageAccountsReducer from './manage-accounts/ShowManageAccountsReducer.js';
import ShowUnsavedWarningReducer from './account/ShowUnsavedWarningReducer.js';
import NextRoutePathReducer from './app/NextRoutePathReducer.js';
import { ADD_ACCOUNT } from './account/AccountsActions.js';

const rootReducer = combineReducers({
  accounts: AccountsReducer,
  accountTransactions: AccountTransactionsReducer,
  uploadedTransactions: UploadedTransactionsReducer,
  showManageAccounts: ShowManageAccountsReducer,
  unsavedWarningVisible: ShowUnsavedWarningReducer,
  nextRoutePath: NextRoutePathReducer,
  form: formReducer.plugin({
    AddAccountForm: (state, action) => {
      console.log('actionType', action.type);
      switch (action.type) {
        case ADD_ACCOUNT:
          console.log('returning undefined');
          return undefined;
        default:
          return state;
      }
    }
  }),
});

export default rootReducer;
