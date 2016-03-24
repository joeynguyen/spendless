export const TOGGLE_MANAGE_ACCOUNTS = 'TOGGLE_MANAGE_ACCOUNTS';
export const TOGGLE_ACCOUNT_DELETED_CONFIRM = 'TOGGLE_ACCOUNT_DELETED_CONFIRM';

export function toggleManageAccounts() {
  return {
    type: TOGGLE_MANAGE_ACCOUNTS
  };
}

export function toggleAccountDeletedConfirm() {
  return {
    type: TOGGLE_ACCOUNT_DELETED_CONFIRM
  };
}
