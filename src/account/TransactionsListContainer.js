import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAccountTransactions, resetAccountTransactions } from './TransactionsActions.js';
import TransactionsList from './TransactionsList.js';

class TransactionListContainer extends Component {
  static propTypes = {
    accountId: PropTypes.string.isRequired,
    accountTransactions: PropTypes.arrayOf(React.PropTypes.object),
    addTransactionVisible: PropTypes.bool.isRequired,
    editTransactionVisible: PropTypes.bool.isRequired,
    uploadedTransactions: PropTypes.arrayOf(React.PropTypes.object),
    doGetAccountTransactions: PropTypes.func.isRequired,
    doResetAccountTransactions: PropTypes.func.isRequired,
  }
  componentWillMount() {
    this.props.doGetAccountTransactions(this.props.accountId);
  }
  componentDidUpdate(prevProps) {
    // console.log('prevProps.accountId', prevProps.accountId);
    // console.log('this.props.accountId', this.props.accountId);
    if (this.props.accountId !== prevProps.accountId) {
      this.props.doGetAccountTransactions(this.props.accountId);
    }
  }
  componentWillUnmount() {
    this.props.doResetAccountTransactions();
  }

  render() {
    const formCheckboxValues = this.props.accountTransactions.reduce((previousValue, currentValue) =>
      Object.assign(previousValue, {[currentValue._id.toString()]: false})
    , {});
    const formInitialValues = {
      initialValues: formCheckboxValues
    };
    return (
      <TransactionsList
        accountId={this.props.accountId}
        addTransactionVisible={this.props.addTransactionVisible}
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
    addTransactionVisible: state.addTransactionVisible,
    editTransactionVisible: state.editTransactionVisible,
    uploadedTransactions: state.uploadedTransactions,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doGetAccountTransactions: getAccountTransactions,
    doResetAccountTransactions: resetAccountTransactions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionListContainer);
