import PouchDB from 'pouchdb';
import AccountsApi from '../api/accountsApi';
export const LOAD_ACCOUNTS_SUCCESS = 'LOAD_ACCOUNTS_SUCCESS';
export const UPDATE_ACCOUNTS = 'UPDATE_ACCOUNTS';
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';
export const TOGGLE_UNSAVED_WARNING = 'TOGGLE_UNSAVED_WARNING';

// PouchDB is loaded externally through a script tag in the browser
const db = new PouchDB('accounts');
const remoteCouch = 'http://127.0.0.1:5984/accounts';
const syncDB = () => {
  db.sync(remoteCouch, {live: false})
    .on('complete', function(success) {
      console.log('PouchDB-Server accounts database sync success :', success);
    })
    .on('error', function(err) {
      console.log('PouchDB-Server accounts database sync error :', err);
    });
};

export function loadAccountsSuccess(accounts) {
  // Load in UI the current list of accounts
  return {
    type: LOAD_ACCOUNTS_SUCCESS,
    payload: accounts
  };
}

// TODO: change removeAccount to removeAccount like Pluralsight tutorial?
// can we remove the 'export'? is it only being used in this file?
function removeAccount(accountId) {
  return {
    type: REMOVE_ACCOUNT,
    data: accountId
  };
}

// TODO: change updateAccounts to updateAccountsSuccess like Pluralsight tutorial?
// can we remove the 'export'? is it only being used in this file?
export function updateAccounts(accountData) {
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
      syncDB();
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
      syncDB();
    }).catch(error => {
      throw error;
    });
  };
}

export function deleteAccount(account) {
  return function(dispatch) {
    return AccountsApi.deleteAccountFromDB(account).then(deletedAccount => {
      dispatch(removeAccount(deletedAccount.id));
      syncDB();
      // pass deleted account object back to invoker's success method
      return deletedAccount;
    }).catch(error => {
      console.log('deleteAccount error', error);
      throw error;
    });
  };
}
