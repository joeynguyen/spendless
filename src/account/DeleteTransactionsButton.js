import PouchDB from 'pouchdb';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

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

    db.bulkDocs(selectedTransactions)
      .catch(function(err) {
        console.log(err);
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

export default connect(mapStateToProps)(DeleteTransactionsButton);
