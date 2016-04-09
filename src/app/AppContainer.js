import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateAccounts, deleteAccount } from '../account/AccountsActions.js';
import { updateAccountTransactions } from '../account/TransactionsActions.js';
import PouchDBChanges from 'react-pouchdb-changes';
import App from './App.js';

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    doUpdateAccounts: PropTypes.func.isRequired,
    doDeleteAccount: PropTypes.func.isRequired,
    doUpdateAccountTransactions: PropTypes.func.isRequired,
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
    // if (change.deleted) {
    //   this.props.doDeleteAccount(change.id);
    // } else { // updated/inserted
    //   this.props.doUpdateAccounts(change.doc);
    // }
    this.props.doUpdateAccountTransactions(change.doc);
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
    doUpdateAccountTransactions: updateAccountTransactions,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(AppContainer);
