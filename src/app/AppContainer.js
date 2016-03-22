import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateAccounts, deleteAccount } from '../account/AccountsActions.js';
import PouchDBChanges from 'react-pouchdb-changes';
import App from './App.js';

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    doUpdateAccounts: PropTypes.func.isRequired,
    doDeleteAccount: PropTypes.func.isRequired,
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
  render() {
    return (
      <PouchDBChanges
        dbUrl="accounts"
        changesOpts={{since: 'now', live: true, include_docs: true}}
        onChange={change => this.handleChange(change)}
        onError={err => console.log(err)}
      >
        <App children={this.props.children} />
      </PouchDBChanges>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doUpdateAccounts: updateAccounts,
    doDeleteAccount: deleteAccount,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(AppContainer);