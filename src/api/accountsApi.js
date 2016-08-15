import PouchDB from 'pouchdb';

// PouchDB is loaded externally through a script tag in the browser
const db = new PouchDB('accounts');

class AccountsApi {
  static getAccountsFromDB() {
    return new Promise((resolve, reject) => {
      db.allDocs({
        include_docs: true,
        descending: true,
      }).then((result) => {
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

  // static handleUpdateAccount(account, fields) {
  //   const newAccountObj = Object.assign({}, account, {
  //     name: fields.accountName.value,
  //     type: fields.accountType.value,
  //     company: fields.accountCompany.value,
  //   });
  //   // Update account in DB
  //   db.put(newAccountObj).then(result => {
  //     console.log('Successfully updated account', result);
  //     // this.setState({alertVisible: true});
  //   }).catch(err => {
  //     console.log(err);
  //     // TODO: Add error message after update fail
  //   });
  // }

  static saveAccountToDB(account) {
    return new Promise((resolve, reject) => {
      db.put(account).then(result => {
        db.get(result.id).then(function(doc) {
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
          console.log('deleteAccountFromDB', doc);
          resolve(doc);
        })
        .catch(err => {
          console.log('deleteAccountFromDB error', err);
          reject(err);
        });
      // setTimeout(() => {
      //   const indexOfAccountToDelete = accounts.findIndex(account => {
      //     account.accountId == accountId;
      //   });
      //   accounts.splice(indexOfAccountToDelete, 1);
      //   resolve();
      // }, delay);
    });
  }
}

export default AccountsApi;
