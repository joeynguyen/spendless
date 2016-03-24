import { STORE_DELETED_ACCOUNT_NAME } from '../manage-accounts/ManageAccountsActions.js';

export default function(state = '', action) {
  switch (action.type) {
    case STORE_DELETED_ACCOUNT_NAME:
      return action.data;
    default:
      return state;
  }
}
