import PouchDB from 'pouchdb';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Button, ButtonInput } from 'react-bootstrap';
import toastr from 'toastr';

// PouchDB is loaded externally through a script tag in the browser
const db = new PouchDB('accounts');

class DeleteAccountFormContainer extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    toggleConfirmDelete: PropTypes.func.isRequired,
  }

  state = {
    confirmDeleteText: '',
  }

  handleConfirmDeleteText = (e) => {
    this.setState({ confirmDeleteText: e.target.value });
  }

  handleDeleteAccount = (e) => {
    e.preventDefault();
    // Remove account from DB
    db.remove(this.props.account)
      .then(result => {
        console.log('Successfully deleted account', result);
        toastr.success(this.props.account.name + ' deleted', null, {timeOut: 1500});
      })
      .catch(err => {
        console.log('Error trying to delete account', err);
        toastr.error('Restart the application and retry', 'Error deleting account', {timeOut: 1500});
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
              bsStyle="primary"
              groupClassName="horizontal-button-group"
              buttonAfter={cancelButton}
              type="submit"
              value="Confirm" />
          </div>
        </div>
      </form>
    );
  }
}

export default DeleteAccountFormContainer;
