import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
// import { updateAccountTransactions, resetUploadedTransactions } from '../account/TransactionsActions.js';

class DeleteTransactionsButton extends Component {
  static propTypes = {
    accountTransactions: PropTypes.arrayOf(React.PropTypes.object),
    manageTransactionsListForm: PropTypes.object.isRequired,
  }
  // Save transactions uploaded from CSV to database
  handleDelete = () => {
    // PouchDB is loaded externally through a script tag in the browser
    const db = new PouchDB('transactions');
    const { manageTransactionsListForm } = this.props;

    console.log('Trying to delete...');
    console.log('manageTransactionsListForm', manageTransactionsListForm);
    const selectedTransactionsIds = Object.keys(manageTransactionsListForm).filter(item => {
      const currentKey = manageTransactionsListForm[item];
      return (currentKey !== undefined && currentKey._isFieldValue && currentKey.value ? item : '');
    });
    const selectedTransactions = selectedTransactionsIds.map(id => {
      return this.props.accountTransactions.find(transaction => transaction._id === id);
    });
    console.log('selectedTransactions', selectedTransactions);
    // db
    //   .bulkDocs(this.props.uploadedTransactions)
    //   .then(() => {
    //     // Update UI with new saved transactions
    //     this.props.doUpdateAccountTransactions(this.props.uploadedTransactions);
    //   })
    //   .then(() => {
    //     // Remove unsaved transactions from UI
    //     this.props.doResetUploadedTransactions();
    //   }).catch(function(err) {
    //     console.log(err);
    //   });
  }
  render() {
    return (
      <Button
        onClick={this.handleDelete}
        bsStyle="danger"
        bsSize="small"
        /* disabled={(this.props.uploadedTransactions.length === 0)} */
      >
        Delete
      </Button>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountTransactions: state.accountTransactions,
    manageTransactionsListForm: state.form.ManageTransactionsList,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     doUpdateAccountTransactions: updateAccountTransactions,
//     doResetUploadedTransactions: resetUploadedTransactions
//   }, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(DeleteTransactionsButton);
export default connect(mapStateToProps)(DeleteTransactionsButton);
