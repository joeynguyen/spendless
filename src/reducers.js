import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AccountsReducer from './account/AccountsReducer.js';
import AccountTransactionsReducer from './account/AccountTransactionsReducer.js';
import UploadedTransactionsReducer from './account/UploadedTransactionsReducer.js';
import ManageAccountsVisibleReducer from './manage-accounts/ManageAccountsVisibleReducer.js';
import EditTransactionVisibleReducer from './account/EditTransactionVisibleReducer.js';
import AddTransactionVisibleReducer from './account/AddTransactionVisibleReducer.js';
import ActiveTransactionReducer from './account/ActiveTransactionReducer.js';
import UnsavedWarningVisibleReducer from './account/UnsavedWarningVisibleReducer.js';
import NextRoutePathReducer from './app/NextRoutePathReducer.js';
import { RESET_CURRENT_TRANSACTIONS } from './account/TransactionsActions.js';

const rootReducer = combineReducers({
  accounts: AccountsReducer,
  accountTransactions: AccountTransactionsReducer,
  activeTransaction: ActiveTransactionReducer,
  uploadedTransactions: UploadedTransactionsReducer,
  manageAccountsVisible: ManageAccountsVisibleReducer,
  addTransactionVisible: AddTransactionVisibleReducer,
  editTransactionVisible: EditTransactionVisibleReducer,
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
    ManageTransactionsList: (state, action) => {
      switch (action.type) {
        case RESET_CURRENT_TRANSACTIONS:
          // Identify transaction ids on currently displayed account
          const currentTransactionIds = Object.keys(state).filter(item => {
            const currentKey = state[item];
            return (currentKey !== undefined && currentKey._isFieldValue);
          });
          const stateCopy = Object.assign({}, state);
          // Remove currentTransactionIds from ManageTransactionsList stateCopy
          currentTransactionIds.forEach(item => {
            delete stateCopy[item];
          });
          return stateCopy;
        default:
          return state;
      }
    },
  }),
});

export default rootReducer;
