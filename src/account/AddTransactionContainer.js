import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import AddTransaction from './AddTransaction.js';
import { saveTransactions, toggleAddTransaction } from './TransactionsActions.js';

class AddTransactionContainer extends Component {
  static propTypes = {
    accountId: PropTypes.string.isRequired,
    addTransactionVisible: PropTypes.bool.isRequired,
    doToggleAddTransaction: PropTypes.func.isRequired,
    doSaveTransactions: PropTypes.func.isRequired,
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
    console.log(newTransactionObj);

    // Add account to DB
    this.props.doSaveTransactions(newTransactionObj)
      .then(result => {
        console.log('Successfully added transaction', result);
        toastr.success('Transaction added', null, {timeOut: 1500});
        this.props.doToggleAddTransaction();
      }).catch(err => {
        console.log(err);
        toastr.error('Restart the application and retry', 'Error adding transaction', {timeOut: 1500});
      });
  }

  render() {
    const reduxFormHandleSubmit = this.props.handleSubmit(this.handleSaveTransaction);
    return (
      <AddTransaction
        addTransactionVisible={this.props.addTransactionVisible}
        doToggleAddTransaction={this.props.doToggleAddTransaction}
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
  return bindActionCreators({
    doToggleAddTransaction: toggleAddTransaction,
    doSaveTransactions: saveTransactions,
  }, dispatch);
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
