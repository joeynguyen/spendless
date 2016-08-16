import PouchDB from 'pouchdb';
import TransactionsApi from '../api/transactionsApi';

export const LOAD_ACCOUNT_TRANSACTIONS = 'LOAD_ACCOUNT_TRANSACTIONS';
export const RESET_ACCOUNT_TRANSACTIONS = 'RESET_ACCOUNT_TRANSACTIONS';
export const ADD_UPLOADED_TRANSACTIONS = 'ADD_UPLOADED_TRANSACTIONS';
export const DELETE_ACCOUNT_TRANSACTIONS = 'DELETE_ACCOUNT_TRANSACTIONS';
export const UPDATE_ACCOUNT_TRANSACTIONS = 'UPDATE_ACCOUNT_TRANSACTIONS';
export const RESET_UPLOADED_TRANSACTIONS = 'RESET_UPLOADED_TRANSACTIONS';
export const RESET_CURRENT_TRANSACTIONS = 'RESET_CURRENT_TRANSACTIONS';
export const TOGGLE_EDIT_TRANSACTION = 'TOGGLE_EDIT_TRANSACTION';
export const TOGGLE_ADD_TRANSACTION = 'TOGGLE_ADD_TRANSACTION';
export const SELECT_ACTIVE_TRANSACTION = 'SELECT_ACTIVE_TRANSACTION';

// PouchDB is loaded externally through a script tag in the browser
const transDB = new PouchDB('transactions');
const remoteCouch = 'http://127.0.0.1:5984/transactions';
const syncDB = () => {
  transDB.sync(remoteCouch, {live: false})
    .on('complete', function(success) {
      console.log('PouchDB-Server transactions database sync success :', success);
    })
    .on('error', function(err) {
      console.log('PouchDB-Server transactions database sync error :', err);
    });
};

function loadAccountTransactions(accountTransactions) {
  // Load in UI the current list of accounts
  return {
    type: LOAD_ACCOUNT_TRANSACTIONS,
    payload: accountTransactions
  };
}

export function getAccountTransactions(accountId) {
  return function(dispatch) {
    return TransactionsApi.getAccountTransactionsFromDB(accountId).then(transactions => {
      dispatch(loadAccountTransactions(transactions));
    }).catch(error => {
      console.log('getAccountTransactions error', error);
      throw error;
    });
  };
}

export function resetAccountTransactions() {
  return {
    type: RESET_ACCOUNT_TRANSACTIONS,
    payload: []
  };
}

export function addUploadedTransactions(uploadedTransactions) {
  return {
    type: ADD_UPLOADED_TRANSACTIONS,
    payload: uploadedTransactions
  };
}

export function deleteAccountTransactions(transactions) {
  syncDB();
  return {
    type: DELETE_ACCOUNT_TRANSACTIONS,
    payload: transactions
  };
}

export function updateAccountTransactions(transactions) {
  syncDB();
  return {
    type: UPDATE_ACCOUNT_TRANSACTIONS,
    payload: transactions
  };
}

export function resetUploadedTransactions() {
  return {
    type: RESET_UPLOADED_TRANSACTIONS,
    payload: []
  };
}

export function resetCurrentTransactions() {
  return {
    type: RESET_CURRENT_TRANSACTIONS,
  };
}

export function toggleEditTransaction() {
  return {
    type: TOGGLE_EDIT_TRANSACTION
  };
}

export function toggleAddTransaction() {
  return {
    type: TOGGLE_ADD_TRANSACTION
  };
}

export function selectActiveTransaction(transaction = null) {
  return {
    type: SELECT_ACTIVE_TRANSACTION,
    data: transaction
  };
}
