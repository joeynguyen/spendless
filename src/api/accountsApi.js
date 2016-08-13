import PouchDB from 'pouchdb';

// PouchDB is loaded externally through a script tag in the browser
const db = new PouchDB('accounts');

// const accounts = [
//   {
//     id: 'react-flux-building-applications',
//     title: 'Building Applications in React and Flux',
//     watchHref: 'http://www.pluralsight.com/accounts/react-flux-building-applications',
//     authorId: 'cory-house',
//     length: '5:08',
//     category: 'JavaScript'
//   },
//   {
//     id: 'clean-code',
//     title: 'Clean Code: Writing Code for Humans',
//     watchHref: 'http://www.pluralsight.com/accounts/writing-clean-code-humans',
//     authorId: 'cory-house',
//     length: '3:10',
//     category: 'Software Practices'
//   },
//   {
//     id: 'architecture',
//     title: 'Architecting Applications for the Real World',
//     watchHref: 'http://www.pluralsight.com/accounts/architecting-applications-dotnet',
//     authorId: 'cory-house',
//     length: '2:52',
//     category: 'Software Architecture'
//   },
//   {
//     id: 'career-reboot-for-developer-mind',
//     title: 'Becoming an Outlier: Reprogramming the Developer Mind',
//     watchHref: 'http://www.pluralsight.com/accounts/career-reboot-for-developer-mind',
//     authorId: 'cory-house',
//     length: '2:30',
//     category: 'Career'
//   },
//   {
//     id: 'web-components-shadow-dom',
//     title: 'Web Component Fundamentals',
//     watchHref: 'http://www.pluralsight.com/accounts/web-components-shadow-dom',
//     authorId: 'cory-house',
//     length: '5:10',
//     category: 'HTML5'
//   }
// ];

// function replaceAll(str, find, replace) {
//   return str.replace(new RegExp(find, 'g'), replace);
// }
//
// // This would be performed on the server in a real app. Just stubbing in.
// const generateId = (account) => {
//   return replaceAll(account.title, ' ', '-');
// };

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

  // static deleteAccount(accountId) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       const indexOfAccountToDelete = accounts.findIndex(account => {
  //         account.accountId == accountId;
  //       });
  //       accounts.splice(indexOfAccountToDelete, 1);
  //       resolve();
  //     }, delay);
  //   });
  // }
}

export default AccountsApi;
