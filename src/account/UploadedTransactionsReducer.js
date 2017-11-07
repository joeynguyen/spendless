import { ADD_UPLOADED_TRANSACTIONS, NEGATE_UPLOADED_TRANSACTIONS, RESET_UPLOADED_TRANSACTIONS } from './TransactionsActions.js';

export default function(state = [], action) {
  switch (action.type) {
    case ADD_UPLOADED_TRANSACTIONS:
      return action.payload;
    case NEGATE_UPLOADED_TRANSACTIONS:
      // Flip negative and positive values
      return state.map(item => (
        {
          ...item,
          amount: (item.amount * -1).toFixed(2)
        }
      ));
    case RESET_UPLOADED_TRANSACTIONS:
      return action.payload;
    case '@@router/LOCATION_CHANGE':
      // reset uploaded transactions to 0 whenever page changes
      return [];
    default:
      return state;
  }
}
