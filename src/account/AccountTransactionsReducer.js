import { FETCH_ACCOUNT_TRANSACTIONS, RESET_ACCOUNT_TRANSACTIONS, UPDATE_ACCOUNT_TRANSACTIONS, DELETE_ACCOUNT_TRANSACTIONS } from './TransactionsActions.js';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ACCOUNT_TRANSACTIONS:
      return action.payload;
    case RESET_ACCOUNT_TRANSACTIONS:
      return action.payload;
    case UPDATE_ACCOUNT_TRANSACTIONS:
      // TODO: Handle bulk updating
      // Adding new bulk transactions
      if (Array.isArray(action.payload)) {
        return state.concat(action.payload);
      }

      // Updating single existing transaction
      const updatedTransactionObj = state.find(item => item._id === action.payload._id);
      const updatedTransactionIndex = state.indexOf(updatedTransactionObj);
      return [
        ...state.slice(0, updatedTransactionIndex),
        action.payload,
        ...state.slice(updatedTransactionIndex + 1),
      ];
      // TODO: Handle adding single transaction
    case DELETE_ACCOUNT_TRANSACTIONS:
      const deletedTransactionObj = state.find(item => item._id === action.payload);
      const deletedTransactionIndex = state.indexOf(deletedTransactionObj);
      return [
        ...state.slice(0, deletedTransactionIndex),
        ...state.slice(deletedTransactionIndex + 1),
      ];
    default:
      return state;
  }
}
