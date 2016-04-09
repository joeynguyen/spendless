import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateAccounts, deleteAccount } from '../account/AccountsActions.js';
import { deleteAccountTransactions, updateAccountTransactions } from '../account/TransactionsActions.js';
import PouchDBChanges from 'react-pouchdb-changes';
import App from './App.js';

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    doUpdateAccounts: PropTypes.func.isRequired,
    doDeleteAccount: PropTypes.func.isRequired,
    doUpdateAccountTransactions: PropTypes.func.isRequired,
    doDeleteAccountTransactions: PropTypes.func.isRequired,
  }
  handleChange = (change) => {
    if (change.deleted) {
      // Update Redux state
      this.props.doDeleteAccount(change.id);
    } else { // updated/inserted
      // Update Redux state
      this.props.doUpdateAccounts(change.doc);
    }
  }
  handleTransactionsChange = (change) => {
    console.log('handleTransactionsChange', change);
    if (change.doc.language === 'query') {
      // if just fetching account transactions, do nothing here
      // fetching is handled in TransactionsListContainer component
    } else if (change.deleted) {
      this.props.doDeleteAccountTransactions(change.id);
    } else { // updated/inserted
      this.props.doUpdateAccountTransactions(change.doc);
    }
  }
  render() {
    return (
      <PouchDBChanges
        dbUrl="accounts"
        changesOpts={{since: 'now', live: true, include_docs: true}}
        onChange={change => this.handleChange(change)}
        onError={err => console.log(err)}
      >
        <PouchDBChanges
          dbUrl="transactions"
          changesOpts={{since: 'now', live: true, include_docs: true}}
          onChange={change => this.handleTransactionsChange(change)}
          onError={err => console.log(err)}
        >
          <App children={this.props.children} />
        </PouchDBChanges>
      </PouchDBChanges>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doUpdateAccounts: updateAccounts,
    doDeleteAccount: deleteAccount,
    doDeleteAccountTransactions: deleteAccountTransactions,
    doUpdateAccountTransactions: updateAccountTransactions,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(AppContainer);
