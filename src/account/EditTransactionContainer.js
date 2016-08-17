import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import EditTransaction from './EditTransaction.js';
import { saveTransactions, toggleEditTransaction, selectActiveTransaction } from './TransactionsActions.js';

class EditTransactionContainer extends Component {
  static propTypes = {
    activeTransaction: PropTypes.object.isRequired,
    editTransactionVisible: PropTypes.bool.isRequired,
    doSaveTransactions: PropTypes.func.isRequired,
    doToggleEditTransaction: PropTypes.func.isRequired,
    doSelectActiveTransaction: PropTypes.func.isRequired,
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
    this.props.doSaveTransactions(newTransactionObj)
      .then(result => {
        console.log('Successfully updated transaction', result);
        toastr.success('Transaction updated', null, {timeOut: 1500});
        this.props.doToggleEditTransaction();
      }).catch(err => {
        console.log(err);
        toastr.error('Restart the application and retry', 'Error updating transaction', {timeOut: 1500});
      });
  }

  render() {
    const reduxFormHandleSubmit = this.props.handleSubmit(this.handleUpdateTransaction);
    return (
      <EditTransaction
        editTransactionVisible={this.props.editTransactionVisible}
        doToggleEditTransaction={this.props.doToggleEditTransaction}
        doSelectActiveTransaction={this.props.doSelectActiveTransaction}
        fields={this.props.fields}
        pristine={this.props.pristine}
        doSubmit={reduxFormHandleSubmit}
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
    doSaveTransactions: saveTransactions,
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
