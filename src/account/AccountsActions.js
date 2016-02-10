export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS';
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
