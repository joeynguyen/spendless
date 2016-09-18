import { TOGGLE_MANAGE_TRANSACTION } from './TransactionsActions.js';

export default function(state = null, action) {
  switch (action.type) {
    case TOGGLE_MANAGE_TRANSACTION:
      return action.data;
    default:
      return state;
  }
}
