import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { deleteAccount, updateAccount, fetchAccounts } from '../account/AccountsActions.js';
import { deleteAccount, fetchAccounts } from '../account/AccountsActions.js';
import PouchDBChanges from 'react-pouchdb-changes';
import App from './App.js';

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    doDeleteAccount: PropTypes.func.isRequired,
  }
  handleChange = (change) => {
    if (change.deleted) {
      // change.id holds the deleted id
      // Update Redux state
      console.log(change);
      // deleting from AppContainer
      this.props.doDeleteAccount(change.id);
    } else { // updated/inserted
      // change.doc holds the new doc
      console.log(change);
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
    doDeleteAccount: deleteAccount,
    doFetchAccounts: fetchAccounts,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(AppContainer);
