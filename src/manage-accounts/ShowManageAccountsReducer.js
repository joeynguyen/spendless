import { SET_WINDOW_VISIBILITY } from '../manage-accounts/ManageAccountsActions.js';

export default function(state = false, action) {
  console.log('Action received', action);

  switch (action.type) {
    case SET_WINDOW_VISIBILITY:
      return action.filter;
    default:
      return state;
  }
}
