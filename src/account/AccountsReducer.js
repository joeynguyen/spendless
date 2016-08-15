import { LOAD_ACCOUNTS_SUCCESS, UPDATE_ACCOUNTS, REMOVE_ACCOUNT } from './AccountsActions.js';

export default function(state = [], action) {
  console.log('action received', action);

  switch (action.type) {
    case LOAD_ACCOUNTS_SUCCESS:
      return action.payload;
    case UPDATE_ACCOUNTS:
      const updatedAccountIndex = state.findIndex(item => item._id === action.data._id);
      // Add new account if account doesn't already exist
      if (updatedAccountIndex < 0) {
        return state.concat(action.data);
      }
      // Update existing account
      return [
        ...state.slice(0, updatedAccountIndex),
        action.data,
        ...state.slice(updatedAccountIndex + 1),
      ];
    case REMOVE_ACCOUNT:
      const deletedAccountIndex = state.findIndex(item => item._id === action.data);
      return [
        ...state.slice(0, deletedAccountIndex),
        ...state.slice(deletedAccountIndex + 1),
      ];
    default:
      return state;
  }
}
