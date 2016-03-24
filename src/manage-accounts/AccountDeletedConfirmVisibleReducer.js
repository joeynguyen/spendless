import { TOGGLE_ACCOUNT_DELETED_CONFIRM } from '../manage-accounts/ManageAccountsActions.js';

export default function(state = false, action) {
  switch (action.type) {
    case TOGGLE_ACCOUNT_DELETED_CONFIRM:
      return !state;
    default:
      return state;
  }
}
