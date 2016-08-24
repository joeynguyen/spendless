import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAccountTransactions, resetAccountTransactions } from './TransactionsActions.js';
import TransactionsListFormContainer from './TransactionsListFormContainer.js';

class TransactionListContainer extends Component {
  static propTypes = {
    activeAccountId: PropTypes.string.isRequired,
    accountTransactions: PropTypes.arrayOf(React.PropTypes.object),
    doGetAccountTransactions: PropTypes.func.isRequired,
    doResetAccountTransactions: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.doGetAccountTransactions(this.props.activeAccountId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeAccountId !== prevProps.activeAccountId) {
      this.props.doGetAccountTransactions(this.props.activeAccountId);
    }
  }

  componentWillUnmount() {
    this.props.doResetAccountTransactions();
  }

  render() {
    // create an initialValues prop to pass to component that uses redux-form
    // need to do this so that these key value pairs are in state when form is initialized
    // set the checkboxes to not be checked by default
    const formCheckboxInitialValues = this.props.accountTransactions.reduce((previousValue, currentValue) => {
      return Object.assign(previousValue, {[currentValue._id.toString()]: false});
    }, {});
    const formInitialValues = {
      initialValues: formCheckboxInitialValues
    };
    const fields = this.props.accountTransactions.map(transaction => transaction._id);

    return (
      <TransactionsListFormContainer
        accountTransactions={this.props.accountTransactions}
        activeAccountId={this.props.activeAccountId}
        fields={fields}
        {...formInitialValues}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accountTransactions: state.accountTransactions,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doGetAccountTransactions: getAccountTransactions,
    doResetAccountTransactions: resetAccountTransactions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionListContainer);
