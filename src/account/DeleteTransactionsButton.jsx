import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { Button } from 'antd';
import * as transactionsActions from './TransactionsActions.js';

class DeleteTransactionsButton extends Component {
  static propTypes = {
    accountTransactions: PropTypes.arrayOf(PropTypes.object),
    actions: PropTypes.object.isRequired,
    selectedTransactionsIds: PropTypes.array.isRequired,
  }

  handleDelete = (selectedIds) => {
    const selectedTransactions = selectedIds.map(id => {
      // find transaction objects that correspond to each selected id
      const transactionObject = this.props.accountTransactions.find(transaction => transaction._id === id);
      // mark transaction object as ready for deletion for PouchDB
      return Object.assign({}, transactionObject, {_deleted: true});
    });

    this.props.actions.deleteAccountTransactions(selectedTransactions)
      .then(() => {
        toastr.success('Transactions deleted', null, {timeOut: 1500});
      }).catch(() => {
        toastr.error('Restart the application and retry', 'Error deleting transactions', {timeOut: 1500});
      });
  }
  render() {
    // don't show this button unless there are selected transactions
    if (this.props.selectedTransactionsIds.length === 0) {
      return null;
    }

    return (
      <Button
        type="danger"
        size="large"
        onClick={() => this.handleDelete(this.props.selectedTransactionsIds)}
      >Delete Transactions</Button>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountTransactions: state.accountTransactions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(transactionsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTransactionsButton);
