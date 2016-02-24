export const TOGGLE_MANAGE_ACCOUNTS = 'TOGGLE_MANAGE_ACCOUNTS';
export const TOGGLE_ADD_ACCOUNT = 'TOGGLE_ADD_ACCOUNT';

export function toggleManageAccounts() {
  return {
    type: TOGGLE_MANAGE_ACCOUNTS
  };
}

export function toggleAddAccount() {
  return {
    type: TOGGLE_ADD_ACCOUNT
  };
}
