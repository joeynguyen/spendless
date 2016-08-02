import PouchDB from 'pouchdb';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { resetUploadedTransactions } from '../account/TransactionsActions.js';

// PouchDB is loaded externally through a script tag in the browser
const transDB = new PouchDB('transactions');

// transDB.info().then(function(info) {
//   console.log('transDB info: ', info);
// });

class SaveButton extends Component {
  static propTypes = {
    uploadedTransactions: PropTypes.arrayOf(React.PropTypes.object),
    doResetUploadedTransactions: PropTypes.func.isRequired,
  }
  // Save transactions uploaded from CSV to database
  handleSave = () => {
    console.log('Trying to submit...');
    console.log(this.props.uploadedTransactions);
    transDB
      .bulkDocs(this.props.uploadedTransactions)
      .then(() => {
        // Remove unsaved transactions from UI
        this.props.doResetUploadedTransactions();
      }).catch(function(err) {
        console.log(err);
      });
  }
  render() {
    return (
      <Button
        onClick={this.handleSave}
        bsStyle="primary"
        bsSize="small"
        disabled={(this.props.uploadedTransactions.length === 0)}
      >
        Save Uploaded Transactions
      </Button>
    );
  }
}

function mapStateToProps(state) {
  return {
    uploadedTransactions: state.uploadedTransactions,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doResetUploadedTransactions: resetUploadedTransactions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
