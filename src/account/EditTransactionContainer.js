import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import EditTransaction from './EditTransaction.js';
import { toggleEditTransaction, selectActiveTransaction } from './TransactionsActions.js';

class EditTransactionContainer extends Component {
  static propTypes = {
    editTransactionVisible: PropTypes.bool.isRequired,
    doToggleEditTransaction: PropTypes.func.isRequired,
    doSelectActiveTransaction: PropTypes.func.isRequired,
  }
  render() {
    return (
      <EditTransaction {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  let { transactionDate, description, category, amount } = state.activeTransaction;
  // date has to be in this format for input[type="date"] to read it
  transactionDate = moment(transactionDate, 'MM-DD-YYYY').format('YYYY-MM-DD');
  amount = Number(amount).toFixed(2);
  return {
    editTransactionVisible: state.editTransactionVisible,
    initialValues: {
      date: transactionDate,
      description: description,
      category: category,
      amount: amount,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doToggleEditTransaction: toggleEditTransaction,
    doSelectActiveTransaction: selectActiveTransaction,
  }, dispatch);
}

export default reduxForm(
  {
    form: 'EditTransaction',
    fields: ['date', 'description', 'category', 'amount'],
  },
  mapStateToProps,
  mapDispatchToProps
)(EditTransactionContainer);
