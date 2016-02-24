import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AccountsReducer from './account/AccountsReducer.js';
import AccountTransactionsReducer from './account/AccountTransactionsReducer.js';
import UploadedTransactionsReducer from './account/UploadedTransactionsReducer.js';
import ShowManageAccountsReducer from './manage-accounts/ShowManageAccountsReducer.js';
import ShowUnsavedWarningReducer from './account/ShowUnsavedWarningReducer.js';
import NextRoutePathReducer from './app/NextRoutePathReducer.js';
import AddAccountVisibleReducer from './manage-accounts/AddAccountVisibleReducer.js';
import { ADD_ACCOUNT } from './account/AccountsActions.js';

const rootReducer = combineReducers({
  accounts: AccountsReducer,
  accountTransactions: AccountTransactionsReducer,
  uploadedTransactions: UploadedTransactionsReducer,
  showManageAccounts: ShowManageAccountsReducer,
  unsavedWarningVisible: ShowUnsavedWarningReducer,
  addAccountVisible: AddAccountVisibleReducer,
  nextRoutePath: NextRoutePathReducer,
  form: formReducer.plugin({
    AddAccountForm: (state, action) => {
      switch (action.type) {
        case ADD_ACCOUNT:
          return undefined;
        case 'redux-form/CHANGE':
          if (action.field === 'accountType') {
            // reset accountCompany value when changing accountType value
            // since both bank and credit cards use accountCompany
            return {...state, accountCompany: ''};
          }
          return state;
        default:
          return state;
      }
    }
  }),
});

export default rootReducer;
