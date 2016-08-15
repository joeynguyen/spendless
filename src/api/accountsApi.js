import PouchDB from 'pouchdb';

// PouchDB is loaded externally through a script tag in the browser
const db = new PouchDB('accounts');
const remoteCouch = 'http://127.0.0.1:5984/accounts';

function syncDB() {
  db.sync(remoteCouch, {live: false})
    .on('complete', function(success) {
      console.log('PouchDB-Server accounts database sync success :', success);
    })
    .on('error', function(err) {
      console.log('PouchDB-Server accounts database sync error :', err);
    });
}

class AccountsApi {
  static getAccountsFromDB() {
    return new Promise((resolve, reject) => {
      db.allDocs({
        include_docs: true,
        descending: true,
      }).then((result) => {
        syncDB();
        resolve(
          result.rows.map((row) => {
            return {
              '_id': row.doc._id,
              '_rev': row.doc._rev,
              'name': row.doc.name,
              'type': row.doc.type,
              'company': row.doc.company,
            };
          })
        );
      }).catch(function(err) {
        reject(err);
      });
    });
  }

  static saveAccountToDB(account) {
    return new Promise((resolve, reject) => {
      db.put(account).then(result => {
        db.get(result.id).then(function(doc) {
          syncDB();
          resolve(doc);
        }).catch(function(err) {
          console.log('saveAccountToDB GET error', err);
          reject(err);
        });
      }).catch(err => {
        console.log('saveAccountToDB PUT error', err);
        reject(err);
      });
    });
  }

  static deleteAccountFromDB(account) {
    return new Promise((resolve, reject) => {
      db.remove(account)
        .then(doc => {
          syncDB();
          resolve(doc);
        })
        .catch(err => {
          console.log('deleteAccountFromDB error', err);
          reject(err);
        });
    });
  }
}

export default AccountsApi;
