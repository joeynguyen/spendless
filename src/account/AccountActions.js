export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS';

export function fetchAccounts() {
  // PouchDB is loaded externally through a script tag in the browser
  const db = new PouchDB('accounts');

  // Show the current list of transactions by reading them from the database
  const allAccounts = db.allDocs({
    include_docs: true,
    descending: true,
  }).then((result) => {
    return result.rows.map((row) => {
      return {
        '_id': row.doc._id,
        'name': row.doc.name,
        'type': row.doc.type,
        'bank': row.doc.bank,
        'cc': row.doc.cc,
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
