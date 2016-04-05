import { TOGGLE_EDIT_TRANSACTION } from './TransactionsActions.js';

export default function(state = false, action) {
  switch (action.type) {
    case TOGGLE_EDIT_TRANSACTION:
      return !state;
    default:
      return state;
  }
}

