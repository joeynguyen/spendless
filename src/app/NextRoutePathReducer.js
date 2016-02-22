import { STORE_NEXT_ROUTE_PATH } from './AppActions.js';

export default function(state = '', action) {
  switch (action.type) {
    case STORE_NEXT_ROUTE_PATH:
      return action.data;
    default:
      return state;
  }
}
