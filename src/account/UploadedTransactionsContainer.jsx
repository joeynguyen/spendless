import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { resetUploadedTransactions } from './TransactionsActions.js';
import UploadedTransactions from './UploadedTransactions.jsx';

class UploadedTransactionsContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    activeAccountId: PropTypes.string,
    uploadedTransactions: PropTypes.arrayOf(PropTypes.object),
  }

  render() {
    return (
      <UploadedTransactions
        activeAccountId={this.props.activeAccountId}
        uploadedTransactions={this.props.uploadedTransactions}
        resetUploadedTransactions={this.props.actions.resetUploadedTransactions}
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
      resetUploadedTransactions: resetUploadedTransactions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadedTransactionsContainer);

