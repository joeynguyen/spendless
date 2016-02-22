import { SHOW_UNSAVED_WARNING } from './AccountsActions.js';

export default function(state = false, action) {
  switch (action.type) {
    case SHOW_UNSAVED_WARNING:
      return action.filter;
    default:
      return state;
  }
}
