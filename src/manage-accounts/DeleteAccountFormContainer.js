import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Button, ButtonInput } from 'react-bootstrap';
import { toggleAccountDeletedConfirm, storeDeletedAccountName } from '../manage-accounts/ManageAccountsActions.js';

// PouchDB is loaded externally through a script tag in the browser
const db = new PouchDB('accounts');

class DeleteAccountFormContainer extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    toggleConfirmDelete: PropTypes.func.isRequired,
    doToggleAccountDeletedConfirm: PropTypes.func.isRequired,
    doStoreDeletedAccountName: PropTypes.func.isRequired,
  }

  state = {
    confirmDeleteText: '',
  }

  handleConfirmDeleteText = (e) => {
    this.setState({ confirmDeleteText: e.target.value });
  }

  handleDeleteAccount = (e) => {
    e.preventDefault();
    const self = this;
    // Remove account from DB
    db.remove(this.props.account).then(function(result) {
      console.log('Successfully deleted account', result);
      self.props.doStoreDeletedAccountName(self.props.account.name);
    }).then(function() {
      self.props.doToggleAccountDeletedConfirm();
    }).catch(function(err) {
      console.log('Error trying to delete account', err);
      // TODO: Add error message after delete fail
    });
  }

  render() {
    const cancelButton = (
      <Button
        onClick={this.props.toggleConfirmDelete}
      >Cancel</Button>
    );
    return (
      <form onSubmit={this.handleDeleteAccount}>
        <hr />
        <p>Type DELETE into this box to confirm</p>
        <div className="row">
          <div className="col-xs-6">
            <Input
              type="text"
              value={this.state.confirmDeleteText}
              onChange={this.handleConfirmDeleteText}
              placeholder="DELETE" />
          </div>
          <div className="col-xs-6">
            <ButtonInput
              disabled={this.state.confirmDeleteText !== 'DELETE'}
              bsStyle="success"
              groupClassName="horizontal-button-group"
              buttonAfter={cancelButton}
              type="submit"
              standalone
              value="Confirm" />
          </div>
        </div>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doToggleAccountDeletedConfirm: toggleAccountDeletedConfirm,
    doStoreDeletedAccountName: storeDeletedAccountName,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(DeleteAccountFormContainer);
