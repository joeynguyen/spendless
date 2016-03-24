import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Alert, Button } from 'react-bootstrap';
import { toggleAccountDeletedConfirm } from '../manage-accounts/ManageAccountsActions.js';

class AccountDeletedConfirmModal extends Component {
  static propTypes = {
    accountDeletedName: PropTypes.string.isRequired,
    accountDeletedConfirmVisible: PropTypes.bool.isRequired,
    doToggleAccountDeletedConfirm: PropTypes.func.isRequired,
  }
  close = () => {
    this.props.doToggleAccountDeletedConfirm();
  }
  render() {
    return (
        <Modal
          show={this.props.accountDeletedConfirmVisible}
          bsSize="small"
          onHide={this.close}
          aria-labelledby="contained-modal-title"
        >
          <Alert bsStyle="success" style={{marginBottom: 0}}>
            <h4>Account Deleted</h4>
            <p>{this.props.accountDeletedName} has been deleted</p>
            <p><Button onClick={this.close}>Close</Button></p>
          </Alert>
        </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountDeletedConfirmVisible: state.accountDeletedConfirmVisible,
    accountDeletedName: state.accountDeletedName,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doToggleAccountDeletedConfirm: toggleAccountDeletedConfirm,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDeletedConfirmModal);
