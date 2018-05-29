import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Icon, Popconfirm, Table, Tooltip } from 'antd';
import { message } from 'antd';

import DeleteTransactionsButton from './DeleteTransactionsButton.jsx';

const mapTransactionData = data =>
  data.map(transaction => ({
    key: transaction._id,
    amount: transaction.amount,
    category: transaction.category,
    date: transaction.date,
    description: transaction.description,
    notes: transaction.notes,
  }));

class TransactionsList extends Component {
  state = {
    selectedTransactionsIds: [],
  };

  handleEditClick = (e, transactionId) => {
    e.preventDefault();
    // find transaction that corresponds to id
    const thisTransaction = this.props.accountTransactions.find(
      transaction => transaction._id === transactionId
    );
    this.props.actions.toggleManageTransaction(thisTransaction);
  };

  handleDeleteTransaction = transactionId => {
    const thisTransaction = this.props.accountTransactions.find(
      transaction => transaction._id === transactionId
    );
    this.props.actions
      .deleteAccountTransactions(thisTransaction)
      .then(() => {
        message.success('Transaction deleted');
      })
      .catch(() => {
        message.error('Restart the application and retry');
      });
  };

  render() {
    const renderColumns = [
      {
        title: 'Date',
        dataIndex: 'date',
      },
      {
        title: 'Description',
        dataIndex: 'description',
      },
      {
        title: 'Category',
        dataIndex: 'category',
      },
      {
        title: 'Amount',
        className: 'column-amount',
        dataIndex: 'amount',
        render: amount => (
          <span className={amount > 0 ? 'positive-amount' : ''}>
            {Number(amount).toFixed(2)}
          </span>
        ),
      },
      {
        title: 'Notes',
        className: 'column-notes',
        dataIndex: 'notes',
        render: text =>
          text ? (
            <Tooltip placement="left" title={text}>
              <Icon type="file-text" style={{ fontSize: 14 }} />
            </Tooltip>
          ) : null,
      },
      {
        title: 'Actions',
        className: 'column-actions',
        dataIndex: 'actions',
        render: (text, record) => (
          <span>
            <a href="#" onClick={e => this.handleEditClick(e, record.key)}>
              Edit
            </a>
            <span className="ant-divider" />
            <Popconfirm
              onConfirm={() => this.handleDeleteTransaction(record.key)}
              title="Delete transaction?"
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <a href="#">Delete</a>
            </Popconfirm>
          </span>
        ),
      },
    ];
    const rowSelection = {
      onChange: selectedRowKeys => {
        this.setState({ selectedTransactionsIds: selectedRowKeys });
      },
    };
    const data = mapTransactionData(this.props.accountTransactions);

    return (
      <div>
        <DeleteTransactionsButton
          selectedTransactionsIds={this.state.selectedTransactionsIds}
        />
        <Table
          rowSelection={rowSelection}
          columns={renderColumns}
          dataSource={data}
        />
      </div>
    );
  }
}

TransactionsList.propTypes = {
  accountTransactions: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.object.isRequired,
};

export default TransactionsList;
