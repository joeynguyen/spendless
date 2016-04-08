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
    fields: PropTypes.object.isRequired,
    pristine: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <EditTransaction
        editTransactionVisible={this.props.editTransactionVisible}
        doToggleEditTransaction={this.props.doToggleEditTransaction}
        doSelectActiveTransaction={this.props.doSelectActiveTransaction}
        fields={this.props.fields}
        pristine={this.props.pristine}
      />
    );
  }
}

function mapStateToProps(state) {
  let { date, description, category, amount } = state.activeTransaction;
  // date has to be in this format for input[type="date"] to read it
  date = moment(date, 'MM-DD-YYYY').format('YYYY-MM-DD');
  amount = Number(amount).toFixed(2);
  return {
    editTransactionVisible: state.editTransactionVisible,
    initialValues: {
      date: date,
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
