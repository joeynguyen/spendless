import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toastr from 'toastr';

import { resetUploadedTransactions, saveAccountTransactions } from './TransactionsActions.js';
import UploadedTransactions from './UploadedTransactions.jsx';

class UploadedTransactionsContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    activeAccountId: PropTypes.string,
    uploadedTransactions: PropTypes.arrayOf(PropTypes.object),
  }
  handleSave = () => {
    this.props.actions.saveAccountTransactions(this.props.uploadedTransactions)
      .then(() => {
        toastr.success('Uploaded transactions saved', null, {timeOut: 1500});
        // Remove unsaved transactions from UI
        this.props.actions.resetUploadedTransactions();
      }).catch(() => {
        toastr.error('Restart the application and retry', 'Error adding transactions', {timeOut: 1500});
      });
  }

  render() {
    return (
      <UploadedTransactions
        activeAccountId={this.props.activeAccountId}
        uploadedTransactions={this.props.uploadedTransactions}
        resetUploadedTransactions={this.props.actions.resetUploadedTransactions}
        handleSave={this.handleSave}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    activeAccountId: state.activeAccountId,
    uploadedTransactions: state.uploadedTransactions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      resetUploadedTransactions,
      saveAccountTransactions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadedTransactionsContainer);

