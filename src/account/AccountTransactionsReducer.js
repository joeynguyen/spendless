import { FETCH_ACCOUNT_TRANSACTIONS } from './TransactionsActions.js';

export default function(state = [], action) {
  console.log('AccountTransactionsReducer Action received', action);

  switch (action.type) {
    case FETCH_ACCOUNT_TRANSACTIONS:
      return action.payload;
    default:
      return state;
  }
}
