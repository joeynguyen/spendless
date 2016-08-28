import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { Button } from 'react-bootstrap';
import * as transactionsActions from '../account/TransactionsActions.js';

class SaveButtonContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    uploadedTransactions: PropTypes.arrayOf(React.PropTypes.object),
  }
  // Save transactions uploaded from CSV to database
  handleSave = () => {
    this.props.actions.saveAccountTransactions(this.props.uploadedTransactions)
      .then(() => {
        // Remove unsaved transactions from UI
        this.props.actions.resetUploadedTransactions();
      }).catch(() => {
        toastr.error('Restart the application and retry', 'Error adding transactions', {timeOut: 1500});
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
  return {
    actions: bindActionCreators(transactionsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveButtonContainer);
