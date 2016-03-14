import { FETCH_ACCOUNTS, ADD_ACCOUNT, UPDATE_ACCOUNT, DELETE_ACCOUNT } from './AccountsActions.js';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ACCOUNTS:
      return action.payload;
    case ADD_ACCOUNT:
      return state.concat(action.data);
    case UPDATE_ACCOUNT:
      const updatedAccountObj = state.find(item => item._id === action.data._id);
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
