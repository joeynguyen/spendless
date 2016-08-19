import { REMOVE_ACCOUNT_TRANSACTIONS, RESET_CURRENT_TRANSACTIONS } from './TransactionsActions.js';

// Identify transaction ids on currently displayed account
function findCurrentTransactionsIds(currentState) {
  return Object.keys(currentState).filter(item => {
    const currentKey = currentState[item];
    return (currentKey !== undefined && currentKey._isFieldValue);
  });
}

export default function(state, action) {
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
}
