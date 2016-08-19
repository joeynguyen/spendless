import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { Button } from 'react-bootstrap';
import { saveTransactions, resetUploadedTransactions } from '../account/TransactionsActions.js';

class SaveButton extends Component {
  static propTypes = {
    uploadedTransactions: PropTypes.arrayOf(React.PropTypes.object),
    doResetUploadedTransactions: PropTypes.func.isRequired,
    doSaveTransactions: PropTypes.func.isRequired,
  }
  // Save transactions uploaded from CSV to database
  handleSave = () => {
    this.props.doSaveTransactions(this.props.uploadedTransactions)
      .then(result => {
        console.log('Successfully added transactions', result);
        toastr.success('Transactions added', null, {timeOut: 1500});
        // Remove unsaved transactions from UI
        this.props.doResetUploadedTransactions();
      }).catch(function(err) {
        console.log(err);
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
  return bindActionCreators({
    doResetUploadedTransactions: resetUploadedTransactions,
    doSaveTransactions: saveTransactions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
