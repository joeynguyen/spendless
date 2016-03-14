import { ADD_UPLOADED_TRANSACTIONS, RESET_UPLOADED_TRANSACTIONS } from './TransactionsActions.js';

export default function(state = [], action) {
  switch (action.type) {
    case ADD_UPLOADED_TRANSACTIONS:
      return action.payload;
    case RESET_UPLOADED_TRANSACTIONS:
      return action.payload;
    default:
      return state;
  }
}
