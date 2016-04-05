import { SELECT_ACTIVE_TRANSACTION } from './TransactionsActions.js';

export default function(state = null, action) {
  switch (action.type) {
    case SELECT_ACTIVE_TRANSACTION:
      return action.data;
    default:
      return state;
  }
}
