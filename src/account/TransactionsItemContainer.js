import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toastr from 'toastr';
import TransactionsItem from './TransactionsItem.js';
import * as transactionsActions from './TransactionsActions.js';

class TransactionsItemContainer extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    transaction: PropTypes.object.isRequired,
    unsaved: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
  }
  handleDeleteTransactions = () => {
    this.props.actions.deleteAccountTransactions(this.props.transaction)
      .then(() => {
        toastr.success('Transaction deleted', null, {timeOut: 1500});
      })
      .catch(() => {
        toastr.error('Restart the application and retry', 'Error deleting transaction', {timeOut: 1500});
      });
  }
  render() {
    return (
      <TransactionsItem
        reduxFormCheckbox={this.props.field}
        transaction={this.props.transaction}
        toggleEditTransaction={this.props.actions.toggleEditTransaction}
        unsaved={this.props.unsaved}
        handleDeleteTransactions={this.handleDeleteTransactions}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(transactionsActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(TransactionsItemContainer);
