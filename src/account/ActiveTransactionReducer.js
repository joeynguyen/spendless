import { TOGGLE_EDIT_TRANSACTION } from './TransactionsActions.js';

export default function(state = null, action) {
  switch (action.type) {
    case TOGGLE_EDIT_TRANSACTION:
      return action.data;
    default:
      return state;
  }
}
