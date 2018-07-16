import TransactionsApi from '../api/transactionsApi';

export const LOAD_ACCOUNT_TRANSACTIONS = 'LOAD_ACCOUNT_TRANSACTIONS';
export const RESET_ACCOUNT_TRANSACTIONS = 'RESET_ACCOUNT_TRANSACTIONS';
export const ADD_UPLOADED_TRANSACTIONS = 'ADD_UPLOADED_TRANSACTIONS';
export const REMOVE_ACCOUNT_TRANSACTIONS = 'REMOVE_ACCOUNT_TRANSACTIONS';
export const NEGATE_UPLOADED_TRANSACTIONS = 'NEGATE_UPLOADED_TRANSACTIONS';
export const RESET_UPLOADED_TRANSACTIONS = 'RESET_UPLOADED_TRANSACTIONS';
export const UPDATE_ACCOUNT_TRANSACTIONS = 'UPDATE_ACCOUNT_TRANSACTIONS';
export const TOGGLE_MANAGE_TRANSACTION = 'TOGGLE_MANAGE_TRANSACTION';

function loadAccountTransactions(accountTransactions) {
  // Load in UI the current list of accounts
  return {
    payload: accountTransactions,
    type: LOAD_ACCOUNT_TRANSACTIONS,
  };
}

function updateAccountTransactions(transactions) {
  return {
    payload: transactions,
    type: UPDATE_ACCOUNT_TRANSACTIONS,
  };
}

export function getAccountTransactions(accountId, month) {
  return function(dispatch) {
    return TransactionsApi.getAccountTransactionsFromDB(accountId, month)
      .then(transactions => {
        dispatch(loadAccountTransactions(transactions));
      })
      .catch(error => {
        console.log('getAccountTransactions error', error);
        throw error;
      });
  };
}

export function saveAccountTransactions(transactions) {
  return function(dispatch) {
    return TransactionsApi.saveTransactionsToDB(transactions)
      .then(savedTransactions => {
        dispatch(updateAccountTransactions(savedTransactions));
        // pass transaction object back to invoker's success method
        return savedTransactions;
      })
      .catch(error => {
        console.log('saveAccountTransactions error', error);
        throw error;
      });
  };
}

export function resetAccountTransactions() {
  return {
    payload: [],
    type: RESET_ACCOUNT_TRANSACTIONS,
  };
}

export function addUploadedTransactions(uploadedTransactions) {
  return {
    payload: uploadedTransactions,
    type: ADD_UPLOADED_TRANSACTIONS,
  };
}

export function negateUploadedTransactions() {
  return {
    type: NEGATE_UPLOADED_TRANSACTIONS,
  };
}

function removeAccountTransactions(transactions) {
  return {
    payload: transactions,
    type: REMOVE_ACCOUNT_TRANSACTIONS,
  };
}

export function deleteAccountTransactions(transactions) {
  return function(dispatch) {
    return TransactionsApi.deleteTransactionsFromDB(transactions)
      .then(deletedTransactions => {
        dispatch(removeAccountTransactions(deletedTransactions));
        // pass deleted account object back to invoker's success method
        return deletedTransactions;
      })
      .catch(error => {
        console.log('deleteAccountTransactions error', error);
        throw error;
      });
  };
}

export function resetUploadedTransactions() {
  return {
    payload: [],
    type: RESET_UPLOADED_TRANSACTIONS,
  };
}

export function toggleManageTransaction(transaction = null) {
  return {
    data: transaction,
    type: TOGGLE_MANAGE_TRANSACTION,
  };
}
