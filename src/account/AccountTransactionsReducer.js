import { LOAD_ACCOUNT_TRANSACTIONS, RESET_ACCOUNT_TRANSACTIONS, UPDATE_ACCOUNT_TRANSACTIONS, REMOVE_ACCOUNT_TRANSACTIONS } from './TransactionsActions.js';

export default function(state = [], action) {
  switch (action.type) {
    case LOAD_ACCOUNT_TRANSACTIONS:
      return action.payload;
    case RESET_ACCOUNT_TRANSACTIONS:
      return action.payload;
    case UPDATE_ACCOUNT_TRANSACTIONS:
      const updatedTransactionIndex = state.findIndex(item => item._id === action.payload._id);

      // Adding new transaction(s)
      if (updatedTransactionIndex < 0) {
        return state.concat(action.payload);
      }

      // Updating existing transaction
      return [
        ...state.slice(0, updatedTransactionIndex),
        action.payload,
        ...state.slice(updatedTransactionIndex + 1),
      ];
    case REMOVE_ACCOUNT_TRANSACTIONS:
      const deletedTransactionIndex = state.findIndex(item => item._id === action.payload);

      return [
        ...state.slice(0, deletedTransactionIndex),
        ...state.slice(deletedTransactionIndex + 1),
      ];
    default:
      return state;
  }
}
