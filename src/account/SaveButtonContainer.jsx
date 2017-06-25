import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { Button } from 'grommet';
import * as transactionsActions from '../account/TransactionsActions.js';

class SaveButtonContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    uploadedTransactions: PropTypes.arrayOf(PropTypes.object),
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
    // how to disable Grommet Button - https://github.com/grommet/grommet/issues/901
    const saveClickHandler = (this.props.uploadedTransactions.length === 0) ?
      undefined : () => this.handleSave;
    return (
      <Button
        accent
        label="Save Uploaded Transactions"
        onClick={saveClickHandler}
      />
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
