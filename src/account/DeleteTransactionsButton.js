import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { Button } from 'react-bootstrap';
import { deleteAccountTransactions } from './TransactionsActions.js';

class DeleteTransactionsButton extends Component {
  static propTypes = {
    accountTransactions: PropTypes.arrayOf(React.PropTypes.object),
    manageTransactionsListForm: PropTypes.object.isRequired,
    doDeleteAccountTransactions: PropTypes.func.isRequired,
  }

  handleDelete = () => {
    const { manageTransactionsListForm } = this.props;

    // find Ids of each selected transaction
    const selectedTransactionsIds = Object.keys(manageTransactionsListForm).filter(item => {
      const currentKey = manageTransactionsListForm[item];
      return (currentKey !== undefined && currentKey._isFieldValue && currentKey.value);
    });
    const selectedTransactions = selectedTransactionsIds.map(id => {
      // find transaction objects that correspond to each selected id
      const transactionObject = this.props.accountTransactions.find(transaction => transaction._id === id);
      // mark transaction object as ready for deletion
      return Object.assign({}, transactionObject, {_deleted: true});
    });

    this.props.doDeleteAccountTransactions(selectedTransactions)
      .then(() => {
        toastr.success('Transactions deleted', null, {timeOut: 1500});
      }).catch(() => {
        toastr.error('Restart the application and retry', 'Error deleting transactions', {timeOut: 1500});
      });
  }
  render() {
    return (
      <Button
        onClick={this.handleDelete}
        bsStyle="danger"
        bsSize="small"
        /* disabled={(this.props.uploadedTransactions.length === 0)} */
      >
        Delete Selected Transactions
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doDeleteAccountTransactions: deleteAccountTransactions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTransactionsButton);
