import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAccountTransactions, resetAccountTransactions } from './TransactionsActions.js';
import TransactionsList from './TransactionsList.js';

class TransactionListContainer extends Component {
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
    const formCheckboxValues = this.props.accountTransactions.reduce((previousValue, currentValue) =>
      Object.assign(previousValue, {[currentValue._id.toString()]: false})
    , {});
    console.log('formCheckboxValues', formCheckboxValues);
    const formInitialValues = {
      initialValues: formCheckboxValues
    };
    console.log('formInitialValues', formInitialValues);
    return (
      <TransactionsList
        editTransactionVisible={this.props.editTransactionVisible}
        uploadedTransactions={this.props.uploadedTransactions}
        accountTransactions={this.props.accountTransactions}
        fields={this.props.accountTransactions.map(transaction => transaction._id)}
        {...formInitialValues}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionListContainer);
