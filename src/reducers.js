import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import AccountsReducer from './account/AccountsReducer.js';
import AccountTransactionsReducer from './account/AccountTransactionsReducer.js';
import UploadedTransactionsReducer from './account/UploadedTransactionsReducer.js';
import ManageAccountsVisibleReducer from './manage-accounts/ManageAccountsVisibleReducer.js';
import EditTransactionVisibleReducer from './account/EditTransactionVisibleReducer.js';
import AddTransactionVisibleReducer from './account/AddTransactionVisibleReducer.js';
import ActiveTransactionReducer from './account/ActiveTransactionReducer.js';
import UnsavedWarningVisibleReducer from './account/UnsavedWarningVisibleReducer.js';
import NextRoutePathReducer from './app/NextRoutePathReducer.js';
import { REMOVE_ACCOUNT_TRANSACTIONS, RESET_CURRENT_TRANSACTIONS } from './account/TransactionsActions.js';

// Identify transaction ids on currently displayed account
function findCurrentTransactionsIds(currentState) {
  return Object.keys(currentState).filter(item => {
    const currentKey = currentState[item];
    return (currentKey !== undefined && currentKey._isFieldValue);
  });
}

const rootReducer = combineReducers({
  routing: routing,
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
      let currentTransactionIds;
      let stateCopy;
      switch (action.type) {
        case RESET_CURRENT_TRANSACTIONS:
          currentTransactionIds = findCurrentTransactionsIds(state);
          stateCopy = Object.assign({}, state);

          // Remove currentTransactionIds from ManageTransactionsList stateCopy
          currentTransactionIds.forEach(item => delete stateCopy[item]);

          return stateCopy;
        case REMOVE_ACCOUNT_TRANSACTIONS:
          currentTransactionIds = findCurrentTransactionsIds(state);
          stateCopy = Object.assign({}, state);

          // handle bulk delete
          if (Array.isArray(action.payload)) {
            currentTransactionIds.forEach(item => {
              if (action.payload.indexOf(item) > -1) {
                // Remove currentTransactionIds from ManageTransactionsList stateCopy
                delete stateCopy[item];
              }
            });
          } else {
            // handle single delete
            delete stateCopy[action.payload.id];
          }

          return stateCopy;
        default:
          return state;
      }
    },
  }),
});

export default rootReducer;
