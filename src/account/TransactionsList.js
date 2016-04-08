import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAccountTransactions, resetAccountTransactions } from './TransactionsActions.js';
import TransactionsItemContainer from './TransactionsItemContainer.js';
import EditTransactionContainer from './EditTransactionContainer.js';
import styles from './Transactions.module.css';

class TransactionsList extends Component {
  static propTypes = {
    accountId: PropTypes.string.isRequired,
    accountTransactions: PropTypes.arrayOf(React.PropTypes.object),
    editTransactionVisible: PropTypes.bool.isRequired,
    uploadedTransactions: PropTypes.arrayOf(React.PropTypes.object),
    doFetchAccountTransactions: PropTypes.func.isRequired,
    doResetAccountTransactions: PropTypes.func.isRequired,
  }
  componentWillMount() {
    this.props.doFetchAccountTransactions(this.props.accountId);
  }
  componentDidUpdate(prevProps) {
    // console.log('prevProps.accountId', prevProps.accountId);
    // console.log('this.props.accountId', this.props.accountId);
    if (this.props.accountId !== prevProps.accountId) {
      this.props.doFetchAccountTransactions(this.props.accountId);
    }
  }
  componentWillUnmount() {
    this.props.doResetAccountTransactions();
  }

  render() {
    let editTransactionContainer;
    if (this.props.editTransactionVisible) {
      editTransactionContainer = (<EditTransactionContainer />);
    }
    return (
      <div>
      <table className={styles['transactions-table'] + ' transactions-table table table-hover'}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.uploadedTransactions.map(itemData =>
              <TransactionsItemContainer key={itemData._id} transaction={itemData} unsaved />
            )
          }
          {
            this.props.accountTransactions.map(itemData =>
              <TransactionsItemContainer key={itemData._id} transaction={itemData} unsaved={false} />
            )
          }
        </tbody>
      </table>
      { editTransactionContainer }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountTransactions: state.accountTransactions,
    editTransactionVisible: state.editTransactionVisible,
    uploadedTransactions: state.uploadedTransactions,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doFetchAccountTransactions: fetchAccountTransactions,
    doResetAccountTransactions: resetAccountTransactions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList);
