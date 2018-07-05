import {
  deleteAccountFromDB,
  getAccountsFromDB,
  saveAccountToDB,
} from '../api/accountsApi';

export const LOAD_ACCOUNTS_SUCCESS = 'LOAD_ACCOUNTS_SUCCESS';
export const UPDATE_ACCOUNTS = 'UPDATE_ACCOUNTS';
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';
export const TOGGLE_UNSAVED_WARNING = 'TOGGLE_UNSAVED_WARNING';

// Load in UI the current list of accounts
function loadAccountsSuccess(accounts = []) {
  return {
    payload: accounts,
    type: LOAD_ACCOUNTS_SUCCESS,
  };
}

// TODO: change removeAccount to removeAccount like Pluralsight tutorial?
function removeAccount(accountId) {
  return {
    data: accountId,
    type: REMOVE_ACCOUNT,
  };
}

// TODO: change updateAccounts to updateAccountsSuccess like Pluralsight tutorial?
function updateAccounts(accountData) {
  return {
    data: accountData,
    type: UPDATE_ACCOUNTS,
  };
}

export function toggleUnsavedWarning() {
  return {
    type: TOGGLE_UNSAVED_WARNING,
  };
}

export function saveAccount(account) {
  return function(dispatch) {
    return saveAccountToDB(account)
      .then(savedAccount => {
        dispatch(updateAccounts(savedAccount));
        // pass account object back to invoker's success method
        return savedAccount;
      })
      .catch(error => {
        console.error('saveAccounts error', error);
        throw error;
      });
  };
}

export function getAccounts() {
  return function(dispatch) {
    return getAccountsFromDB()
      .then(accounts => {
        dispatch(loadAccountsSuccess(accounts));
      })
      .catch(error => {
        console.error('getAccounts error', error);
        throw error;
      });
  };
}

export function deleteAccount(account) {
  return function(dispatch) {
    return deleteAccountFromDB(account)
      .then(deletedAccount => {
        dispatch(removeAccount(deletedAccount.id));
        // pass deleted account object back to invoker's success method
        return deletedAccount;
      })
      .catch(error => {
        console.error('deleteAccount error', error);
        throw error;
      });
  };
}
