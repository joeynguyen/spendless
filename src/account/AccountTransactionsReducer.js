import { FETCH_ACCOUNT_TRANSACTIONS } from './AccountsActions.js';

export default function(state = [], action) {
  console.log('AccountTransactionsReducer Action received', action);

  switch (action.type) {
    case FETCH_ACCOUNT_TRANSACTIONS:
      console.log('returning payload', action.payload);
      return action.payload;
    default:
      return state;
  }
}
