export const SET_WINDOW_VISIBILITY = 'SET_WINDOW_VISIBILITY';
export const TOGGLE_ADD_ACCOUNT = 'TOGGLE_ADD_ACCOUNT';

export function toggleManageAccounts(visibility) {
  return {
    type: SET_WINDOW_VISIBILITY,
    filter: visibility
  };
}

export function toggleAddAccount() {
  return {
    type: TOGGLE_ADD_ACCOUNT
  };
}
