export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS';
export const FETCH_ACCOUNT_TRANSACTIONS = 'FETCH_ACCOUNT_TRANSACTIONS';
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const ACCOUNT_SELECTED = 'ACCOUNT_SELECTED';

export function fetchAccounts() {
  // PouchDB is loaded externally through a script tag in the browser
  const db = new PouchDB('accounts');

  // Show the current list of accounts by reading them from the database
  const allAccounts = db.allDocs({
    include_docs: true,
    descending: true,
  }).then((result) => {
    return result.rows.map((row) => {
      return {
        '_id': row.doc._id,
        'name': row.doc.name,
        'type': row.doc.type,
        'company': row.doc.company,
      };
    });
    console.log('allAccounts: ', allAccounts);
  }).catch(function(err) {
    console.log(err);
  });
  return {
    type: FETCH_ACCOUNTS,
    payload: allAccounts
  };
}

export function addAccount(newAccount) {
  return {
    type: ADD_ACCOUNT,
    payload: newAccount
  };
}

export function selectAccount(account) {
  return {
    type: ACCOUNT_SELECTED,
    payload: account
  };
}

export function fetchAccountTransactions(activeAccount) {
  // PouchDB is loaded externally through a script tag in the browser
  const transDB = new PouchDB('transactions');

  // Show the current list of accounts by reading them from the database
  const payload = transDB.createIndex({
    index: {
      fields: ['transactionDate', 'accountId']
    }
  }).then(() => {
    // console.log('Successfully created an index!', result);
    return transDB.find({
      // using $gt: null because "$exists doesn't do what you think it does"
      // http://stackoverflow.com/questions/34366615/creating-a-usable-index-in-pouchdb-with-pouchdb-find
      selector: { transactionDate: {'$gt': null}, accountId: activeAccount._id },
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
    console.log('allAccountTransactions: ', allAccountTransactions);
    return allAccountTransactions;
  }).catch(function(err) {
    console.log('Failed to create an index!', err);
  });

  return {
    type: FETCH_ACCOUNT_TRANSACTIONS,
    payload: payload
  };
}
