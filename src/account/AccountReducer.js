import { FETCH_ACCOUNTS } from '../account/AccountActions.js';

export default function(state = null, action) {
  console.log('Action received', action);

  switch (action.type) {
    case FETCH_ACCOUNTS:
      return action.payload;
    default:
      return state;
  }
}
