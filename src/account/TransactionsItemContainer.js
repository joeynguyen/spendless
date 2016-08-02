import PouchDB from 'pouchdb';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TransactionsItem from './TransactionsItem.js';
import { toggleEditTransaction, selectActiveTransaction } from './TransactionsActions.js';

class TransactionsItemContainer extends Component {
  static propTypes = {
    transaction: PropTypes.object.isRequired,
    unsaved: PropTypes.bool.isRequired,
    doToggleEditTransaction: PropTypes.func.isRequired,
    doSelectActiveTransaction: PropTypes.func.isRequired,
  }
  handleDeleteTransactions = () => {
    // PouchDB is loaded externally through a script tag in the browser
    const db = new PouchDB('transactions');

    db.remove(this.props.transaction)
      .then(function(result) {
        console.log('Successfully deleted transaction', result);
      })
      .catch(function(err) {
        console.log('Error trying to delete transaction', err);
        // TODO: Add error message after delete fail
      });
  }
  render() {
    return (
      <TransactionsItem
        /* pass all props including redux-form field props */
        {...this.props}
        handleDeleteTransactions={this.handleDeleteTransactions}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doToggleEditTransaction: toggleEditTransaction,
    doSelectActiveTransaction: selectActiveTransaction,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(TransactionsItemContainer);
