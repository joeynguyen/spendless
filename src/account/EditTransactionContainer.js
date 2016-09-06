import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { Modal } from 'react-bootstrap';
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
    this.props.actions.saveAccountTransactions(newTransactionObj)
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
    // putting Modal wrapper component in Container Component instead of
    // Presentational Component (PC) because React DevTools doesn't show
    // PC as its own component if PC has Modal component in it
    return (
      <Modal
        show={this.props.editTransactionVisible}
        backdrop="static"
        onHide={this.props.actions.toggleEditTransaction}
      >
        <EditTransaction
          toggleEditTransaction={this.props.actions.toggleEditTransaction}
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
  } else if (values.amount && values.amount.toString().indexOf('.') > -1 && values.amount.toString().split('.')[1].length > 2) {
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
