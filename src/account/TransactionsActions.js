export const FETCH_ACCOUNT_TRANSACTIONS = 'FETCH_ACCOUNT_TRANSACTIONS';
export const RESET_ACCOUNT_TRANSACTIONS = 'RESET_ACCOUNT_TRANSACTIONS';
export const ADD_UPLOADED_TRANSACTIONS = 'ADD_UPLOADED_TRANSACTIONS';
export const SAVE_UPLOADED_TRANSACTIONS = 'SAVE_UPLOADED_TRANSACTIONS';
export const RESET_UPLOADED_TRANSACTIONS = 'RESET_UPLOADED_TRANSACTIONS';

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

export function fetchAccountTransactions(accountId) {
  syncDB();

  // Show the current list of accounts by reading them from the database
  const accountTransactions = transDB.createIndex({
    index: {
      fields: ['transactionDate', 'accountId']
    }
  }).then(() => {
    // console.log('Successfully created an index!', result);
    return transDB.find({
      // using $gt: null because "$exists doesn't do what you think it does"
      // http://stackoverflow.com/questions/34366615/creating-a-usable-index-in-pouchdb-with-pouchdb-find
      selector: { transactionDate: {'$gt': null}, accountId: accountId },
      fields: ['_id', '_rev', 'amount', 'category', 'description', 'transactionDate'],
      sort: [{transactionDate: 'desc'}]
    });
  }).then((result) => {
    const allAccountTransactions = result.docs.map(function(doc) {
      return {
        '_id': doc._id,
        'amount': doc.amount,
        'category': doc.category,
        'description': doc.description,
        'transactionDate': doc.transactionDate,
      };
    });
    // console.log('allAccountTransactions: ', allAccountTransactions);
    return allAccountTransactions;
  }).catch(function(err) {
    console.log('Error while attempting to retrieve transactions!', err);
    return [];
  });

  return {
    type: FETCH_ACCOUNT_TRANSACTIONS,
    payload: accountTransactions
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

export function saveUploadedTransactions(uploadedTransactions) {
  return {
    type: SAVE_UPLOADED_TRANSACTIONS,
    payload: uploadedTransactions
  };
}

export function resetUploadedTransactions() {
  return {
    type: RESET_UPLOADED_TRANSACTIONS,
    payload: []
  };
}
