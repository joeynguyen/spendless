import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import AddTransaction from './AddTransaction.js';
import * as transactionsActions from './TransactionsActions.js';

class AddTransactionContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    accountId: PropTypes.string.isRequired,
    addTransactionVisible: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
  }

  handleSaveTransaction = () => {
    const notesValue = (this.props.fields.notes.value !== undefined) ? this.props.fields.notes.value : '';
    const newTransactionObj = {
      _id: new Date().getTime().toString(),
      accountId: this.props.accountId,
      amount: Number(this.props.fields.amount.value).toFixed(2),
      category: this.props.fields.category.value,
      date: this.props.fields.date.value,
      description: this.props.fields.description.value,
      notes: notesValue,
    };

    // Add account to DB
    this.props.actions.saveTransactions(newTransactionObj)
      .then(() => {
        toastr.success('Transaction added', null, {timeOut: 1500});
        this.props.actions.toggleAddTransaction();
      }).catch(() => {
        toastr.error('Restart the application and retry', 'Error adding transaction', {timeOut: 1500});
      });
  }

  render() {
    const reduxFormHandleSubmit = this.props.handleSubmit(this.handleSaveTransaction);
    return (
      <AddTransaction
        addTransactionVisible={this.props.addTransactionVisible}
        toggleAddTransaction={this.props.actions.toggleAddTransaction}
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
  return {
    addTransactionVisible: state.addTransactionVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(transactionsActions, dispatch)
  };
}

export default reduxForm(
  {
    form: 'AddTransaction',
    fields: ['date', 'description', 'category', 'amount', 'notes'],
    validate: validateForm,
  },
  mapStateToProps,
  mapDispatchToProps
)(AddTransactionContainer);
