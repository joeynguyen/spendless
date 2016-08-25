import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import EditTransaction from './EditTransaction.js';
import * as transactionsActions from './TransactionsActions.js';

class EditTransactionContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    activeTransaction: PropTypes.object.isRequired,
    editTransactionVisible: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
  }

  handleUpdateTransaction = () => {
    const newTransactionObj = Object.assign({}, this.props.activeTransaction, {
      amount: Number(this.props.fields.amount.value).toFixed(2),
      category: this.props.fields.category.value,
      date: this.props.fields.date.value,
      description: this.props.fields.description.value,
      notes: this.props.fields.notes.value,
    });

    // Update account in DB
    this.props.actions.saveTransactions(newTransactionObj)
      .then(() => {
        toastr.success('Transaction updated', null, {timeOut: 1500});
        // reset current transaction being edited to null
        this.props.actions.toggleEditTransaction();
      }).catch(() => {
        toastr.error('Restart the application and retry', 'Error updating transaction', {timeOut: 1500});
      });
  }

  render() {
    const reduxFormHandleSubmit = this.props.handleSubmit(this.handleUpdateTransaction);
    return (
      <EditTransaction
        editTransactionVisible={this.props.editTransactionVisible}
        toggleEditTransaction={this.props.actions.toggleEditTransaction}
        fields={this.props.fields}
        pristine={this.props.pristine}
        doSubmit={reduxFormHandleSubmit}
      />
    );
  }
}

function validateForm(values) {
  const errors = {};

  if (!values.date) {
    errors.date = 'Enter a date';
  }
  if (!values.description) {
    errors.description = 'Enter a description';
  }
  if (!values.category) {
    errors.category = 'Enter a category';
  }
  if (!values.amount) {
    errors.amount = 'Enter an amount';
  } else if (values.amount && values.amount.indexOf('.') > -1 && values.amount.split('.')[1].length > 2) {
    errors.amount = 'Enter an amount with 2 or less decimal places';
  }

  return errors;
}

function mapStateToProps(state) {
  const { date, description, category, amount, notes } = state.activeTransaction;
  return {
    activeTransaction: state.activeTransaction,
    editTransactionVisible: state.editTransactionVisible,
    initialValues: {
      date: date,
      description: description,
      category: category,
      amount: amount,
      notes: notes,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(transactionsActions, dispatch)
  };
}

export default reduxForm(
  {
    form: 'EditTransaction',
    fields: ['date', 'description', 'category', 'amount', 'notes'],
    validate: validateForm,
  },
  mapStateToProps,
  mapDispatchToProps
)(EditTransactionContainer);
