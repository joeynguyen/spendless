import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Icon, Table, Tooltip } from 'antd';
// import TransactionsItemContainer from './TransactionsItemContainer.jsx';
// import styles from './Transactions.module.css';
import DeleteTransactionsButton from './DeleteTransactionsButton.jsx';

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
    dataIndex: 'amount',
  },
  {
    title: 'Notes',
    dataIndex: 'notes',
    render: text => text ? (<Tooltip placement="left" title={text}>
      <Icon type="file-text" style={{ fontSize: 14 }} />
    </Tooltip>) : null
  },
];

const mapData = (data) => data.map(transaction => ({
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
  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({ selectedTransactionsIds: selectedRowKeys });
      },
    };
    const { accountTransactions, uploadedTransactions } = this.props;
    const data = mapData(accountTransactions);

    return (
      <div>
        <DeleteTransactionsButton selectedTransactionsIds={this.state.selectedTransactionsIds} />
        <Table rowSelection={rowSelection} columns={renderColumns} dataSource={data} />
      </div>
    );
  }
}

TransactionsList.propTypes = {
  uploadedTransactions: PropTypes.arrayOf(PropTypes.object),
  accountTransactions: PropTypes.arrayOf(PropTypes.object),
};

export default TransactionsList;
