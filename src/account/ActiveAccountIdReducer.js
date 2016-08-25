export default function(state = null, action) {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      if (action.payload.pathname.indexOf('account') > -1) {
        // return the accountId portion of the pathname
        return action.payload.pathname.split('/').slice(-1)[0];
      }
      return null;
    default:
      return state;
  }
}
