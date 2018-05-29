import PouchDB from 'pouchdb-browser';
import PouchDbFind from 'pouchdb-find';

PouchDB.plugin(PouchDbFind);

const db = new PouchDB('transactions');
const remoteCouch = 'http://127.0.0.1:5984/transactions';

function syncDB() {
  db
    .sync(remoteCouch, { live: false })
    .on('complete', function(success) {
      console.log(
        'PouchDB-Server transactions database sync success :',
        success
      );
    })
    .on('error', function(err) {
      console.log('PouchDB-Server transactions database sync error :', err);
    });
}

class TransactionsApi {
  static getAccountTransactionsFromDB(accountId) {
    return new Promise((resolve, reject) => {
      db
        .createIndex({
          index: {
            fields: ['date', 'accountId'],
          },
        })
        .then(() => {
          // create a PouchDB index
          return db.find({
            // using $gt: null because "$exists doesn't do what you think it does"
            // http://stackoverflow.com/questions/34366615/creating-a-usable-index-in-pouchdb-with-pouchdb-find
            selector: { date: { $gt: null }, accountId: accountId },
            fields: [
              '_id',
              '_rev',
              'accountId',
              'amount',
              'category',
              'description',
              'date',
              'notes',
            ],
            sort: [{ date: 'desc' }],
          });
        })
        .then(result => {
          resolve(
            result.docs.map(function(doc) {
              return {
                _id: doc._id,
                _rev: doc._rev,
                accountId: doc.accountId,
                amount: doc.amount,
                category: doc.category,
                description: doc.description,
                date: doc.date,
                notes: doc.notes,
              };
            })
          );
        })
        .catch(function(err) {
          console.log('Error while attempting to retrieve transactions!', err);
          reject(err);
        });
    });
  }

  static saveTransactionsToDB(transactions) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(transactions)) {
        // handle saving multiple transactions
        db
          .bulkDocs(transactions)
          .then(savedTransactions => {
            const newTransactionsKeys = savedTransactions.map(
              transaction => transaction.id
            );
            // GET newly saved transactions from DB
            db
              .allDocs({
                include_docs: true,
                keys: newTransactionsKeys,
              })
              .then(newTransactions => {
                syncDB();
                resolve(
                  newTransactions.rows.map(newTransaction => newTransaction.doc)
                );
              })
              .catch(err => {
                console.log('saveTransactionsToDB bulk save GET error', err);
                reject(err);
              });
          })
          .catch(function(err) {
            console.log('saveTransactionsToDB bulk save PUT error', err);
            reject(err);
          });
      } else {
        // handle saving single transaction
        db
          .put(transactions)
          .then(savedTransaction => {
            db
              .get(savedTransaction.id)
              .then(doc => {
                syncDB();
                resolve(doc);
              })
              .catch(function(err) {
                console.log('saveAccountToDB GET error', err);
                reject(err);
              });
          })
          .catch(err => {
            console.log('saveTransactionsToDB PUT error', err);
            reject(err);
          });
      }
    });
  }

  static deleteTransactionsFromDB(transactions) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(transactions)) {
        db
          .bulkDocs(transactions)
          .then(deletedTransactions => {
            // return IDs of deleted transactions
            resolve(deletedTransactions.map(transaction => transaction.id));
          })
          .catch(function(err) {
            console.log('deleteTransactionsFromDB bulk delete PUT error', err);
            reject(err);
          });
      } else {
        db
          .remove(transactions)
          .then(deletedTransaction => {
            syncDB();
            resolve(deletedTransaction);
          })
          .catch(err => {
            console.log('deleteTransactionsFromDB DELETE error', err);
            reject(err);
          });
      }
    });
  }
}

export default TransactionsApi;
