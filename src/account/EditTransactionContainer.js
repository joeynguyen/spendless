import PouchDB from 'pouchdb';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import EditTransaction from './EditTransaction.js';
import { toggleEditTransaction, selectActiveTransaction } from './TransactionsActions.js';

// PouchDB is loaded externally through a script tag in the browser
const db = new PouchDB('transactions');

class EditTransactionContainer extends Component {
  static propTypes = {
    activeTransaction: PropTypes.object.isRequired,
    editTransactionVisible: PropTypes.bool.isRequired,
    doToggleEditTransaction: PropTypes.func.isRequired,
    doSelectActiveTransaction: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    pristine: PropTypes.bool.isRequired,
  }

  handleUpdateTransaction = () => {
    const newTransactionObj = Object.assign({}, this.props.activeTransaction, {
      amount: this.props.fields.amount.value,
      category: this.props.fields.category.value,
      date: this.props.fields.date.value,
      description: this.props.fields.description.value,
      notes: this.props.fields.notes.value,
    });
    // Update account in DB
    db.put(newTransactionObj).then(result => {
      console.log('Successfully updated transaction', result);
      toastr.success('Transaction updated', null, {timeOut: 1500});
    }).catch(err => {
      console.log(err);
      toastr.error('Restart the application and retry', 'Error updating transaction', {timeOut: 1500});
      // TODO: Add error message after update fail
    });
  }

  render() {
    return (
      <EditTransaction
        editTransactionVisible={this.props.editTransactionVisible}
        doToggleEditTransaction={this.props.doToggleEditTransaction}
        doSelectActiveTransaction={this.props.doSelectActiveTransaction}
        fields={this.props.fields}
        pristine={this.props.pristine}
        handleUpdateTransaction={this.handleUpdateTransaction}
      />
    );
  }
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
  return bindActionCreators({
    doToggleEditTransaction: toggleEditTransaction,
    doSelectActiveTransaction: selectActiveTransaction,
  }, dispatch);
}

export default reduxForm(
  {
    form: 'EditTransaction',
    fields: ['date', 'description', 'category', 'amount', 'notes'],
  },
  mapStateToProps,
  mapDispatchToProps
)(EditTransactionContainer);
