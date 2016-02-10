import { FETCH_ACCOUNTS, ADD_ACCOUNT } from './AccountsActions.js';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ACCOUNTS:
      return action.payload;
    case ADD_ACCOUNT:
      return state.concat(action.payload);
    default:
      return state;
  }
}
