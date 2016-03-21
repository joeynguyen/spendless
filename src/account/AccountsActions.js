export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS';
export const RESET_ADD_ACCOUNT_FORM = 'RESET_ADD_ACCOUNT_FORM';
export const UPDATE_ACCOUNTS = 'UPDATE_ACCOUNTS';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
// export const ACCOUNT_SELECTED = 'ACCOUNT_SELECTED';
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

export function fetchAccounts() {
  syncDB();

  // Show the current list of accounts by reading them from the database
  const allAccounts = db.allDocs({
    include_docs: true,
    descending: true,
  }).then((result) => {
    return result.rows.map((row) => {
      return {
        '_id': row.doc._id,
        '_rev': row.doc._rev,
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

export function resetAddAccountForm() {
  return {
    type: RESET_ADD_ACCOUNT_FORM
  };
}

export function deleteAccount(deletedAccount) {
  return {
    type: DELETE_ACCOUNT,
    data: deletedAccount
  };
}

export function updateAccounts(accountData) {
  return {
    type: UPDATE_ACCOUNTS,
    data: accountData
  };
}

// export function selectAccount(accountId) {
//   const db = new PouchDB('accounts');
//   const account = db.get(accountId).then((doc) => {
//     return doc;
//   }).catch(function(err) {
//     console.log(err);
//   });
//
//   return {
//     type: ACCOUNT_SELECTED,
//     payload: account
//   };
// }

export function toggleUnsavedWarning() {
  return {
    type: TOGGLE_UNSAVED_WARNING
  };
}
