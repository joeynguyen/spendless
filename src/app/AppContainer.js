import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PouchDBChanges from 'react-pouchdb-changes';
import App from './App.js';

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }
  handleTransactionsChange = (change) => {
    console.log('handleTransactionsChange', change);
    if (change.doc.language === 'query') {
      // if just fetching account transactions, do nothing here
      // fetching is handled in TransactionsListContainer component
    } else if (change.deleted) {
      // this.props.doDeleteAccountTransactions(change.id);
    } else { // updated/inserted
      // this.props.doUpdateAccountTransactions(change.doc);
    }
  }
  render() {
    return (
      <PouchDBChanges
        dbUrl="transactions"
        changesOpts={{since: 'now', live: true, include_docs: true}}
        onChange={change => this.handleTransactionsChange(change)}
        onError={err => console.log(err)}
      >
        <App children={this.props.children} />
      </PouchDBChanges>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(AppContainer);
