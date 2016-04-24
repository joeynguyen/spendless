import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import AddTransaction from './AddTransaction.js';
import { toggleAddTransaction } from './TransactionsActions.js';

class AddTransactionContainer extends Component {
  static propTypes = {
    accountId: PropTypes.string.isRequired,
    addTransactionVisible: PropTypes.bool.isRequired,
    doToggleAddTransaction: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    pristine: PropTypes.bool.isRequired,
  }

  state = {
    alertVisible: false,
  }

  handleSaveTransaction = () => {
    // PouchDB is loaded externally through a script tag in the browser
    const db = new PouchDB('transactions');
    const newTransactionObj = {
      _id: (new Date().getTime()).toString(),
      accountId: this.props.accountId,
      amount: this.props.fields.amount.value,
      category: this.props.fields.category.value,
      date: this.props.fields.date.value,
      description: this.props.fields.description.value,
      notes: this.props.fields.notes.value,
    };
    console.log('newTransactionObj', newTransactionObj);
    // Add account to DB
    // db.put(newTransactionObj).then(result => {
    //   console.log('Successfully added transaction', result);
    //   this.setState({alertVisible: true}); // will autohide based on dismissAfter attr of Alert component
    // }).catch(err => {
    //   console.log(err);
    //   // TODO: Add error message if add fails
    // });
  }

  render() {
    return (
      <AddTransaction
        addTransactionVisible={this.props.addTransactionVisible}
        doToggleAddTransaction={this.props.doToggleAddTransaction}
        fields={this.props.fields}
        pristine={this.props.pristine}
        alertVisible={this.state.alertVisible}
        handleSaveTransaction={this.handleSaveTransaction}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    addTransactionVisible: state.addTransactionVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doToggleAddTransaction: toggleAddTransaction,
  }, dispatch);
}

export default reduxForm(
  {
    form: 'AddTransaction',
    fields: ['date', 'description', 'category', 'amount', 'notes'],
  },
  mapStateToProps,
  mapDispatchToProps
)(AddTransactionContainer);