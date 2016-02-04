export const SET_WINDOW_VISIBILITY = 'SET_WINDOW_VISIBILITY';

export function toggleManageAccounts(visibility) {
  return {
    type: SET_WINDOW_VISIBILITY,
    filter: visibility
  };
}
