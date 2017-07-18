import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Table, Tooltip } from 'antd';
// import styles from './Transactions.module.css';
import DeleteTransactionsButton from './DeleteTransactionsButton.jsx';
import * as transactionsActions from './TransactionsActions.js';


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
  }

  handleEditClick = (e, transactionId) => {
    e.preventDefault();
    // find transaction that corresponds to id
    const thisTransaction = this.props.accountTransactions.find(transaction => transaction._id === transactionId);
    this.props.actions.toggleManageTransaction(thisTransaction);
  }

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
        dataIndex: 'amount',
      },
      {
        title: 'Notes',
        dataIndex: 'notes',
        render: text => text ? (<Tooltip placement="left" title={text}>
          <Icon type="file-text" style={{ fontSize: 14 }} />
        </Tooltip>) : null
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        render: (text, record) => (
          <span>
            <a href="#" onClick={(e) => this.handleEditClick(e, record.key)}>Edit</a>
            <span className="ant-divider" />
            <a href="#">Delete</a>
          </span>
        )
      },
    ];
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
  accountTransactions: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.object.isRequired,
  uploadedTransactions: PropTypes.arrayOf(PropTypes.object),
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(transactionsActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(TransactionsList);
