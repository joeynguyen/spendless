import React, { Component } from 'react';
import styles from './Sidebar.module.css';
import SidebarHeader from './SidebarHeader.js';
import AccountGroup from './AccountGroup.js';
import ManageAccountsWindow from './ManageAccounts.js';
import ApiKey from '../api-key.js';

// PouchDB is loaded externally through a script tag in the browser
const db = new PouchDB('accounts');
let remoteCouch = false;
if (ApiKey.user !== '' && ApiKey.pass !== '') {
  remoteCouch = `http://${ApiKey.user}:${ApiKey.pass}@joeynguyen.cloudant.com/spendless-accounts`;
}

export default class Home extends Component {
  state = {
    showModal: false,
    accounts: [],
  }
  componentDidMount() {
    if (remoteCouch) {
      this.syncDB();
    } else {
      this.importAccounts();
    }
  }
  syncDB = () => {
    const self = this;
    const opts = {live: false};
    db.sync(remoteCouch, opts)
      .on('complete', function(success) {
        console.log('CouchDB sync success :', success);
        self.importAccounts();
      })
      .on('error', function(err) {
        console.log('CouchDB sync error :', err);
        self.importAccounts();
      });
  }
  // Show the current list of transactions by reading them from the database
  importAccounts = () => {
    db.allDocs({
      include_docs: true,
      descending: true,
    }).then((result) => {
      const allAccounts = result.rows.map(function(row) {
        return {
          '_id': row.doc._id,
          'name': row.doc.name,
          'type': row.doc.type,
          'bank': row.doc.bank,
          'cc': row.doc.cc,
        };
      });
      console.log('allAccounts: ', allAccounts);
      this.setState({
        accounts: this.state.accounts.concat(allAccounts)
      });
    }).catch(function(err) {
      console.log(err);
    });
  }
  onNewAccount = (newAccount) => {
    this.setState({
      accounts: this.state.accounts.concat(newAccount)
    });
  }
  close = () => {
    this.setState({ showModal: false });
  }
  open = () => {
    this.setState({ showModal: true });
  }
  render() {
    const ccAccounts = this.state.accounts.filter(function(account) {
      return account.type === 'creditcard';
    });
    const bankAccounts = this.state.accounts.filter(function(account) {
      return account.type === 'bank';
    });
    console.log('credit cards: ', ccAccounts);
    console.log('banks: ', bankAccounts);
    return (
      <div id="sidebar" className={styles.sidebar + ' col-xs-3 sidebar'}>
        <SidebarHeader open={this.open} />
        <AccountGroup title="Banks" icon="bank" accounts={bankAccounts} />
        <AccountGroup title="Credit Cards" icon="credit-card" accounts={ccAccounts} />
        <ManageAccountsWindow showModal={this.state.showModal} close={this.close} onNewAccount={this.onNewAccount} />
      </div>
    );
  }
}
