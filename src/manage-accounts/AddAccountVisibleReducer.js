import { TOGGLE_ADD_ACCOUNT } from '../manage-accounts/ManageAccountsActions.js';

export default function(state = false, action) {
  switch (action.type) {
    case TOGGLE_ADD_ACCOUNT:
      return !state;
    default:
      return state;
  }
}
