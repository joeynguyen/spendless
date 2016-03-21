import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AccountsReducer from './account/AccountsReducer.js';
import AccountTransactionsReducer from './account/AccountTransactionsReducer.js';
import UploadedTransactionsReducer from './account/UploadedTransactionsReducer.js';
import ManageAccountsVisibleReducer from './manage-accounts/ManageAccountsVisibleReducer.js';
import UnsavedWarningVisibleReducer from './account/UnsavedWarningVisibleReducer.js';
import NextRoutePathReducer from './app/NextRoutePathReducer.js';
import AddAccountVisibleReducer from './manage-accounts/AddAccountVisibleReducer.js';
import { UPDATE_ACCOUNT } from './account/AccountsActions.js';

const rootReducer = combineReducers({
  accounts: AccountsReducer,
  accountTransactions: AccountTransactionsReducer,
  uploadedTransactions: UploadedTransactionsReducer,
  manageAccountsVisible: ManageAccountsVisibleReducer,
  unsavedWarningVisible: UnsavedWarningVisibleReducer,
  addAccountVisible: AddAccountVisibleReducer,
  nextRoutePath: NextRoutePathReducer,
  form: formReducer.plugin({
    AddAccountForm: (state, action) => {
      switch (action.type) {
        case UPDATE_ACCOUNT:
          // reset the form input values when an account is being added
          return undefined;
        case 'redux-form/CHANGE':
          if (action.field === 'accountType' && action.form === 'AddAccountForm') {
            const newState = Object.assign({}, state);
            // reset accountCompany value when changing accountType value
            // since both bank and credit cards use accountCompany
            newState.accountCompany.value = '';
            return newState;
          }
          return state;
        default:
          return state;
      }
    },
    EditAccount: (state, action) => {
      switch (action.type) {
        case 'redux-form/CHANGE':
          if (action.field === 'accountType' && action.form === 'EditAccount') {
            const newState = Object.assign({}, state);
            // reset accountCompany value when changing accountType value
            // since both bank and credit cards use accountCompany
            newState[action.key].accountCompany.value = '';
            return newState;
          }
          return state;
        default:
          return state;
      }
    },
  }),
});

export default rootReducer;
