import { ACCOUNT_SELECTED } from './AccountsActions.js';

export default function(state = null, action) {
  switch (action.type) {
    case ACCOUNT_SELECTED:
      return action.payload;
    default:
      return state;
  }
}
