import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import TransactionsList from './TransactionsList.jsx';

class TransactionsListFormContainer extends Component {
  static propTypes = {
    accountTransactions: PropTypes.arrayOf(PropTypes.object),
    fields: PropTypes.object.isRequired,
    uploadedTransactions: PropTypes.arrayOf(PropTypes.object),
  }

  render() {
    return (
      <TransactionsList
        uploadedTransactions={this.props.uploadedTransactions}
        accountTransactions={this.props.accountTransactions}
        fields={this.props.fields}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    uploadedTransactions: state.uploadedTransactions,
  };
}

export default reduxForm(
  {
    form: 'ManageTransactionsList',
  },
  mapStateToProps,
)(TransactionsListFormContainer);
