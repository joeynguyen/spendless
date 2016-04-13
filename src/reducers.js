import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AccountsReducer from './account/AccountsReducer.js';
import AccountTransactionsReducer from './account/AccountTransactionsReducer.js';
import UploadedTransactionsReducer from './account/UploadedTransactionsReducer.js';
import ManageAccountsVisibleReducer from './manage-accounts/ManageAccountsVisibleReducer.js';
import EditTransactionVisibleReducer from './account/EditTransactionVisibleReducer.js';
import ActiveTransactionReducer from './account/ActiveTransactionReducer.js';
import AccountDeletedConfirmVisibleReducer from './manage-accounts/AccountDeletedConfirmVisibleReducer.js';
import AccountDeletedNameReducer from './manage-accounts/AccountDeletedNameReducer.js';
import UnsavedWarningVisibleReducer from './account/UnsavedWarningVisibleReducer.js';
import NextRoutePathReducer from './app/NextRoutePathReducer.js';

const rootReducer = combineReducers({
  accounts: AccountsReducer,
  accountTransactions: AccountTransactionsReducer,
  activeTransaction: ActiveTransactionReducer,
  uploadedTransactions: UploadedTransactionsReducer,
  manageAccountsVisible: ManageAccountsVisibleReducer,
  editTransactionVisible: EditTransactionVisibleReducer,
  accountDeletedConfirmVisible: AccountDeletedConfirmVisibleReducer,
  accountDeletedName: AccountDeletedNameReducer,
  unsavedWarningVisible: UnsavedWarningVisibleReducer,
  nextRoutePath: NextRoutePathReducer,
  form: formReducer.plugin({
    AddAccount: (state, action) => {
      switch (action.type) {
        case 'redux-form/CHANGE':
          if (action.field === 'accountType' && action.form === 'AddAccount') {
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
    ManageTransactionsList: state => state,
  }),
});

export default rootReducer;
