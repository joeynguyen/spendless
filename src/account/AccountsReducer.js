import { FETCH_ACCOUNTS, UPDATE_ACCOUNTS, DELETE_ACCOUNT } from './AccountsActions.js';

export default function(state = [], action) {
  console.log('action received', action);

  switch (action.type) {
    case FETCH_ACCOUNTS:
      return action.payload;
    case UPDATE_ACCOUNTS:
      const updatedAccountObj = state.find(item => item._id === action.data._id);
      // Adding new account
      if (!updatedAccountObj) {
        return state.concat(action.data);
      }
      // Updating existing account
      const updatedAccountIndex = state.indexOf(updatedAccountObj);
      return [
        ...state.slice(0, updatedAccountIndex),
        action.data,
        ...state.slice(updatedAccountIndex + 1),
      ];
    case DELETE_ACCOUNT:
      const deletedAccountObj = state.find(item => item._id === action.data);
      const deletedAccountIndex = state.indexOf(deletedAccountObj);
      return [
        ...state.slice(0, deletedAccountIndex),
        ...state.slice(deletedAccountIndex + 1),
      ];
    default:
      return state;
  }
}
