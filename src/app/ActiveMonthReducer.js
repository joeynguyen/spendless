import { SELECT_ACTIVE_MONTH } from './AppActions.js';

export default function(state = null, action) {
  switch (action.type) {
    case SELECT_ACTIVE_MONTH:
      return action.data;
    default:
      return state;
  }
}
