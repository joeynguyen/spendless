import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { message } from 'antd';

import { negateUploadedTransactions, resetUploadedTransactions, saveAccountTransactions } from './TransactionsActions.js';
import UploadedTransactions from './UploadedTransactions.jsx';

class UploadedTransactionsContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    uploadedTransactions: PropTypes.arrayOf(PropTypes.object),
  }
  handleSave = () => {
    this.props.actions.saveAccountTransactions(this.props.uploadedTransactions)
      .then(() => {
        message.success('Uploaded transactions saved');
        // Remove unsaved transactions from UI
        this.props.actions.resetUploadedTransactions();
      }).catch(() => {
        message.error('Restart the application and retry');
      });
  }

  render() {
    return (
      <UploadedTransactions
        uploadedTransactions={this.props.uploadedTransactions}
        resetUploadedTransactions={this.props.actions.resetUploadedTransactions}
        negateUploadedTransactions={this.props.actions.negateUploadedTransactions}
        handleSave={this.handleSave}
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
    actions: bindActionCreators({
      negateUploadedTransactions,
      resetUploadedTransactions,
      saveAccountTransactions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadedTransactionsContainer);

