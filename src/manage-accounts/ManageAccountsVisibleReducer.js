import { TOGGLE_MANAGE_ACCOUNTS } from '../manage-accounts/ManageAccountsActions.js';

export default function(state = false, action) {
  switch (action.type) {
    case TOGGLE_MANAGE_ACCOUNTS:
      return !state;
    default:
      return state;
  }
}
