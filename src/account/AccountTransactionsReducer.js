import { FETCH_ACCOUNT_TRANSACTIONS, RESET_ACCOUNT_TRANSACTIONS, UPDATE_ACCOUNT_TRANSACTIONS } from './TransactionsActions.js';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ACCOUNT_TRANSACTIONS:
      return action.payload;
    case RESET_ACCOUNT_TRANSACTIONS:
      return action.payload;
    case UPDATE_ACCOUNT_TRANSACTIONS:
      return state.concat(action.payload);
    default:
      return state;
  }
}
