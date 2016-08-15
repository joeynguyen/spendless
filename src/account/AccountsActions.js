import AccountsApi from '../api/accountsApi';

export const LOAD_ACCOUNTS_SUCCESS = 'LOAD_ACCOUNTS_SUCCESS';
export const UPDATE_ACCOUNTS = 'UPDATE_ACCOUNTS';
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';
export const TOGGLE_UNSAVED_WARNING = 'TOGGLE_UNSAVED_WARNING';

function loadAccountsSuccess(accounts) {
  // Load in UI the current list of accounts
  return {
    type: LOAD_ACCOUNTS_SUCCESS,
    payload: accounts
  };
}

// TODO: change removeAccount to removeAccount like Pluralsight tutorial?
function removeAccount(accountId) {
  return {
    type: REMOVE_ACCOUNT,
    data: accountId
  };
}

// TODO: change updateAccounts to updateAccountsSuccess like Pluralsight tutorial?
function updateAccounts(accountData) {
  return {
    type: UPDATE_ACCOUNTS,
    data: accountData
  };
}

export function toggleUnsavedWarning() {
  return {
    type: TOGGLE_UNSAVED_WARNING
  };
}

export function saveAccount(account) {
  return function(dispatch) {
    return AccountsApi.saveAccountToDB(account).then(savedAccount => {
      dispatch(updateAccounts(savedAccount));
      // pass account object back to invoker's success method
      return savedAccount;
    }).catch(error => {
      throw error;
    });
  };
}

export function getAccounts() {
  return function(dispatch) {
    return AccountsApi.getAccountsFromDB().then(accounts => {
      dispatch(loadAccountsSuccess(accounts));
    }).catch(error => {
      throw error;
    });
  };
}

export function deleteAccount(account) {
  return function(dispatch) {
    return AccountsApi.deleteAccountFromDB(account).then(deletedAccount => {
      dispatch(removeAccount(deletedAccount.id));
      // pass deleted account object back to invoker's success method
      return deletedAccount;
    }).catch(error => {
      console.log('deleteAccount error', error);
      throw error;
    });
  };
}
