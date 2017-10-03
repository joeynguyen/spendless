import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleUploadedTransactionsModal } from './AccountsActions.js';
import UploadedTransactions from './UploadedTransactions.jsx';

class UploadedTransactionsContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    activeAccountId: PropTypes.string,
    uploadedTransactionsModalVisible: PropTypes.bool.isRequired,
    uploadedTransactions: PropTypes.arrayOf(PropTypes.object),
  }

  render() {
    return (
      <UploadedTransactions
        activeAccountId={this.props.activeAccountId}
        uploadedTransactionsModalVisible={this.props.uploadedTransactionsModalVisible}
        uploadedTransactions={this.props.uploadedTransactions}
        toggleUploadedTransactionsModal={this.props.actions.toggleUploadedTransactionsModal}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    activeAccountId: state.activeAccountId,
    uploadedTransactionsModalVisible: state.uploadedTransactionsModalVisible,
    uploadedTransactions: state.uploadedTransactions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      toggleUploadedTransactionsModal: toggleUploadedTransactionsModal,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadedTransactionsContainer);

