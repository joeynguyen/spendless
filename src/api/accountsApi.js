import PouchDB from 'pouchdb';
import PouchDbFind from 'pouchdb-find';

PouchDB.plugin(PouchDbFind);

const db = new PouchDB('accounts');
const remoteCouch = 'http://127.0.0.1:5984/accounts';

function syncDB() {
  db.sync(remoteCouch, { live: false })
    .on('complete', function(success) {
      console.log('PouchDB-Server accounts database sync success :', success);
    })
    .on('error', function(err) {
      console.log('PouchDB-Server accounts database sync error :', err);
    });
}

export function getAccountsFromDB() {
  return new Promise((resolve, reject) => {
    db.allDocs({
      descending: true,
      include_docs: true,
    })
      .then(result => {
        resolve(
          result.rows.map(row => {
            return {
              _id: row.doc._id,
              _rev: row.doc._rev,
              company: row.doc.company,
              name: row.doc.name,
              type: row.doc.type,
            };
          })
        );
      })
      .catch(function(err) {
        console.log('getAccountsFromDB GET error', err);
        reject(err);
      });
  });
}

export function saveAccountToDB(account) {
  return new Promise((resolve, reject) => {
    db.put(account)
      .then(result => {
        db.get(result.id)
          .then(function(doc) {
            syncDB();
            resolve(doc);
          })
          .catch(function(err) {
            console.log('saveAccountToDB GET error', err);
            reject(err);
          });
      })
      .catch(err => {
        console.log('saveAccountToDB PUT error', err);
        reject(err);
      });
  });
}

export function deleteAccountFromDB(account) {
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
