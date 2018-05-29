import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message } from 'antd';
import { Button, Popconfirm } from 'antd';
import * as transactionsActions from './TransactionsActions.js';

class DeleteTransactionsButton extends Component {
  static propTypes = {
    accountTransactions: PropTypes.arrayOf(PropTypes.object),
    actions: PropTypes.object.isRequired,
    selectedTransactionsIds: PropTypes.array.isRequired,
  };

  handleDelete = selectedIds => {
    const selectedTransactions = selectedIds.map(id => {
      // find transaction objects that correspond to each selected id
      const transactionObject = this.props.accountTransactions.find(
        transaction => transaction._id === id
      );
      // mark transaction object as ready for deletion for PouchDB
      return Object.assign({}, transactionObject, { _deleted: true });
    });

    this.props.actions
      .deleteAccountTransactions(selectedTransactions)
      .then(() => {
        message.success('Transaction(s) deleted');
      })
      .catch(() => {
        message.error('Restart the application and retry');
      });
  };
  render() {
    const noTransactionsSelected =
      this.props.selectedTransactionsIds.length === 0;

    return (
      <Popconfirm
        onConfirm={() => this.handleDelete(this.props.selectedTransactionsIds)}
        title="Delete transaction(s)?"
        okText="Yes"
        cancelText="No"
      >
        <Button
          type="danger"
          icon="minus"
          size="large"
          disabled={noTransactionsSelected}
        >
          Delete Transactions
        </Button>
      </Popconfirm>
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
    actions: bindActionCreators(transactionsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  DeleteTransactionsButton
);
