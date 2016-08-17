import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toastr from 'toastr';
import TransactionsItem from './TransactionsItem.js';
import { deleteAccountTransactions, toggleEditTransaction, selectActiveTransaction } from './TransactionsActions.js';

class TransactionsItemContainer extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    transaction: PropTypes.object.isRequired,
    unsaved: PropTypes.bool.isRequired,
    doDeleteAccountTransactions: PropTypes.func.isRequired,
    doToggleEditTransaction: PropTypes.func.isRequired,
    doSelectActiveTransaction: PropTypes.func.isRequired,
  }
  handleDeleteTransactions = () => {
    this.props.doDeleteAccountTransactions(this.props.transaction)
      .then(function(result) {
        console.log('Successfully deleted transaction', result);
        toastr.success('Transaction deleted', null, {timeOut: 1500});
      })
      .catch(function(err) {
        console.log('Error trying to delete transaction', err);
        toastr.error('Restart the application and retry', 'Error deleting transaction', {timeOut: 1500});
        // TODO: Add error message after delete fail
      });
  }
  render() {
    return (
      <TransactionsItem
        reduxFormCheckbox={this.props.field}
        transaction={this.props.transaction}
        doToggleEditTransaction={this.props.doToggleEditTransaction}
        doSelectActiveTransaction={this.props.doSelectActiveTransaction}
        unsaved={this.props.unsaved}
        handleDeleteTransactions={this.handleDeleteTransactions}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doDeleteAccountTransactions: deleteAccountTransactions,
    doToggleEditTransaction: toggleEditTransaction,
    doSelectActiveTransaction: selectActiveTransaction,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(TransactionsItemContainer);
