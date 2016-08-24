import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import TransactionsList from './TransactionsList.js';
import EditTransactionContainer from './EditTransactionContainer.js';
import AddTransactionContainer from './AddTransactionContainer.js';

class TransactionsListFormContainer extends Component {
  static propTypes = {
    accountTransactions: PropTypes.arrayOf(React.PropTypes.object),
    activeAccountId: PropTypes.string.isRequired,
    addTransactionVisible: PropTypes.bool.isRequired,
    editTransactionVisible: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    uploadedTransactions: PropTypes.arrayOf(React.PropTypes.object),
  }

  render() {
    // create placeholder object that fulfills component prop requirements
    // but doesn't actually have a functional value for uploaded transactions
    let editTransactionContainer;
    let addTransactionContainer;
    if (this.props.editTransactionVisible) {
      editTransactionContainer = (<EditTransactionContainer />);
    }
    if (this.props.addTransactionVisible) {
      addTransactionContainer = (<AddTransactionContainer activeAccountId={this.props.activeAccountId} />);
    }
    return (
      <div>
        <TransactionsList
          uploadedTransactions={this.props.uploadedTransactions}
          accountTransactions={this.props.accountTransactions}
          fields={this.props.fields}
        />
        { addTransactionContainer }
        { editTransactionContainer }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    addTransactionVisible: state.addTransactionVisible,
    editTransactionVisible: state.editTransactionVisible,
    uploadedTransactions: state.uploadedTransactions,
  };
}

export default reduxForm(
  {
    form: 'ManageTransactionsList',
  },
  mapStateToProps,
)(TransactionsListFormContainer);
