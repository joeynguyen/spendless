// import PouchDB from 'pouchdb';
// import PouchdbFind from 'pouchdb-find';
export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS';
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const ACCOUNT_SELECTED = 'ACCOUNT_SELECTED';
export const TOGGLE_UNSAVED_WARNING = 'TOGGLE_UNSAVED_WARNING';

// PouchDB.plugin(PouchdbFind);
// PouchDB.plugin(require('pouchdb-find'));

export function fetchAccounts() {
  const db = new PouchDB('accounts');
  const remoteCouch = 'http://127.0.0.1:5984/accounts';
  const syncDB = () => {
    db.sync(remoteCouch, {live: false})
      .on('complete', function(success) {
        console.log('PouchDB-Server sync success :', success);
      })
      .on('error', function(err) {
        console.log('PouchDB-Server sync error :', err);
      });
  };
  syncDB();

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

export function selectAccount(accountId) {
  const db = new PouchDB('accounts');
  const account = db.get(accountId).then((doc) => {
    return doc;
  }).catch(function(err) {
    console.log(err);
  });

  return {
    type: ACCOUNT_SELECTED,
    payload: account
  };
}

export function toggleUnsavedWarning() {
  return {
    type: TOGGLE_UNSAVED_WARNING
  };
}
