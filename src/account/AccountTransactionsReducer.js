import { FETCH_ACCOUNT_TRANSACTIONS, RESET_ACCOUNT_TRANSACTIONS, SAVE_UPLOADED_TRANSACTIONS } from './TransactionsActions.js';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ACCOUNT_TRANSACTIONS:
      return action.payload;
    case RESET_ACCOUNT_TRANSACTIONS:
      return action.payload;
    case SAVE_UPLOADED_TRANSACTIONS:
      return state.concat(action.payload);
    default:
      return state;
  }
}
