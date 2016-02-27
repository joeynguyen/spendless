import { TOGGLE_UNSAVED_WARNING } from './AccountsActions.js';

export default function(state = false, action) {
  switch (action.type) {
    case TOGGLE_UNSAVED_WARNING:
      return !state;
    default:
      return state;
  }
}
