export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS';
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const ACCOUNT_SELECTED = 'ACCOUNT_SELECTED';
export const SHOW_UNSAVED_WARNING = 'SHOW_UNSAVED_WARNING';

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

export function showUnsavedWarning(show) {
  return {
    type: SHOW_UNSAVED_WARNING,
    filter: show
  };
}