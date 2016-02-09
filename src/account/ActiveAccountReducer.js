import { ACCOUNT_SELECTED } from './AccountsActions.js';

export default function(state = null, action) {
  console.log('Action received', action);

  switch (action.type) {
    case ACCOUNT_SELECTED:
      console.log('returning payload', action.payload);
      return action.payload;
    default:
      return state;
  }
}
