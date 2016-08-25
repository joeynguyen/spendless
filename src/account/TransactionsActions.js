import TransactionsApi from '../api/transactionsApi';

export const LOAD_ACCOUNT_TRANSACTIONS = 'LOAD_ACCOUNT_TRANSACTIONS';
export const RESET_ACCOUNT_TRANSACTIONS = 'RESET_ACCOUNT_TRANSACTIONS';
export const ADD_UPLOADED_TRANSACTIONS = 'ADD_UPLOADED_TRANSACTIONS';
export const REMOVE_ACCOUNT_TRANSACTIONS = 'REMOVE_ACCOUNT_TRANSACTIONS';
export const UPDATE_ACCOUNT_TRANSACTIONS = 'UPDATE_ACCOUNT_TRANSACTIONS';
export const RESET_UPLOADED_TRANSACTIONS = 'RESET_UPLOADED_TRANSACTIONS';
export const RESET_CURRENT_TRANSACTIONS = 'RESET_CURRENT_TRANSACTIONS';
export const TOGGLE_EDIT_TRANSACTION = 'TOGGLE_EDIT_TRANSACTION';
export const TOGGLE_ADD_TRANSACTION = 'TOGGLE_ADD_TRANSACTION';

function loadAccountTransactions(accountTransactions) {
  // Load in UI the current list of accounts
  return {
    type: LOAD_ACCOUNT_TRANSACTIONS,
    payload: accountTransactions
  };
}

function updateAccountTransactions(transactions) {
  return {
    type: UPDATE_ACCOUNT_TRANSACTIONS,
    payload: transactions
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

export function saveTransactions(transactions) {
  return function(dispatch) {
    return TransactionsApi.saveTransactionsToDB(transactions).then(savedTransactions => {
      dispatch(updateAccountTransactions(savedTransactions));
      // pass transaction object back to invoker's success method
      return savedTransactions;
    }).catch(error => {
      console.log('saveTransactions error', error);
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

function removeAccountTransactions(transactions) {
  return {
    type: REMOVE_ACCOUNT_TRANSACTIONS,
    payload: transactions
  };
}

export function deleteAccountTransactions(transactions) {
  return function(dispatch) {
    return TransactionsApi.deleteTransactionsFromDB(transactions).then(deletedTransactions => {
      dispatch(removeAccountTransactions(deletedTransactions));
      // pass deleted account object back to invoker's success method
      return deletedTransactions;
    }).catch(error => {
      console.log('deleteAccountTransactions error', error);
      throw error;
    });
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

export function toggleEditTransaction(transaction = null) {
  return {
    type: TOGGLE_EDIT_TRANSACTION,
    data: transaction
  };
}

export function toggleAddTransaction() {
  return {
    type: TOGGLE_ADD_TRANSACTION
  };
}
