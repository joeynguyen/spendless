import { TOGGLE_ADD_TRANSACTION } from './TransactionsActions.js';

export default function(state = false, action) {
  switch (action.type) {
    case TOGGLE_ADD_TRANSACTION:
      return !state;
    default:
      return state;
  }
}

