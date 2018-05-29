import { TOGGLE_MANAGE_TRANSACTION } from './TransactionsActions.js';

export default function(state = false, action) {
  switch (action.type) {
    case TOGGLE_MANAGE_TRANSACTION:
      return !state;
    default:
      return state;
  }
}
