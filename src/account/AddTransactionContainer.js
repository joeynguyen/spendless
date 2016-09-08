import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { Modal } from 'react-bootstrap';
import AddTransaction from './AddTransaction.js';
import * as transactionsActions from './TransactionsActions.js';

class AddTransactionContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    activeAccountId: PropTypes.string.isRequired,
    addTransactionVisible: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
  }

  handleSaveTransaction = () => {
    const notesValue = (this.props.fields.notes.value !== undefined) ? this.props.fields.notes.value : '';
    const newTransactionObj = {
      _id: new Date().getTime().toString(),
      accountId: this.props.activeAccountId,
      amount: Number(this.props.fields.amount.value).toFixed(2),
      category: this.props.fields.category.value,
      date: this.props.fields.date.value,
      description: this.props.fields.description.value,
      notes: notesValue,
    };

    // Add account to DB
    this.props.actions.saveAccountTransactions(newTransactionObj)
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
      <Modal
        show={this.props.addTransactionVisible}
        backdrop="static"
        onHide={this.props.actions.toggleAddTransaction}
      >
        <AddTransaction
          toggleAddTransaction={this.props.actions.toggleAddTransaction}
          fields={this.props.fields}
          pristine={this.props.pristine}
          doSubmit={reduxFormHandleSubmit}
        />
      </Modal>
    );
  }
}

function validateForm(values) {
  const errors = {};
  const amountRegex = /^-?\d*\.?\d{0,2}$/;

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
  } else if (!amountRegex.test(values.amount)) {
    // this is a workaround to go with input[type="text"] because redux-form@5.3.3
    // currently doesn't allow typing ".0" in an input[type="number"]
    // https://github.com/erikras/redux-form/issues/1383
    errors.amount = 'Enter a valid amount. Example: (10.52)';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    addTransactionVisible: state.addTransactionVisible,
    activeAccountId: state.activeAccountId,
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
