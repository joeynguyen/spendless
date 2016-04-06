import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import EditTransaction from './EditTransaction.js';
import { toggleEditTransaction, selectActiveTransaction } from './TransactionsActions.js';

class EditTransactionContainer extends Component {
  static propTypes = {
    activeTransaction: PropTypes.object,
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
  const date = moment(state.activeTransaction.transactionDate, 'MM-DD-YYYY').format('YYYY-MM-DD');
  return {
    editTransactionVisible: state.editTransactionVisible,
    activeTransaction: state.activeTransaction,
    initialValues: {
      date: date,
      description: state.activeTransaction.description,
      category: state.activeTransaction.category,
      amount: state.activeTransaction.amount,
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
