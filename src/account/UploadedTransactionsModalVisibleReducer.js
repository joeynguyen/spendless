import { TOGGLE_UPLOADED_TRANSACTIONS_MODAL } from './AccountsActions.js';

export default function(state = false, action) {
  switch (action.type) {
    case TOGGLE_UPLOADED_TRANSACTIONS_MODAL:
      return !state;
    default:
      return state;
  }
}
