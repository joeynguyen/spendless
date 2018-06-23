import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as transactionsActions from './TransactionsActions.js';
import TransactionsList from './TransactionsList.jsx';

class TransactionsListContainer extends Component {
  static propTypes = {
    accountTransactions: PropTypes.arrayOf(PropTypes.object),
    actions: PropTypes.object.isRequired,
    activeAccountId: PropTypes.string.isRequired,
    uploadedTransactions: PropTypes.arrayOf(PropTypes.object),
  };

  componentDidMount() {
    this.props.actions.getAccountTransactions(this.props.activeAccountId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeAccountId !== prevProps.activeAccountId) {
      this.props.actions.resetAccountTransactions();
      this.props.actions.getAccountTransactions(this.props.activeAccountId);
    }
  }

  componentWillUnmount() {
    this.props.actions.resetAccountTransactions();
  }

  render() {
    return (
      <TransactionsList
        accountTransactions={this.props.accountTransactions}
        uploadedTransactions={this.props.uploadedTransactions}
        actions={this.props.actions}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accountTransactions: state.accountTransactions,
    uploadedTransactions: state.uploadedTransactions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(transactionsActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsListContainer);
