import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormControl, Button, ButtonToolbar } from 'react-bootstrap';

export default class DeleteAccountForm extends Component {
  static propTypes = {
    toggleConfirmDelete: PropTypes.func.isRequired,
    handleDeleteAccount: PropTypes.func.isRequired,
  }

  state = {
    confirmDeleteText: '',
  }

  handleConfirmDeleteText = (e) => {
    this.setState({ confirmDeleteText: e.target.value });
  }

  render() {
    return (
      <form id="delete-account-form" onSubmit={this.props.handleDeleteAccount}>
        <hr />
        <p>Type DELETE into this box to confirm</p>
        <div className="row">
          <div className="col-xs-6">
            <FormControl
              type="text"
              value={this.state.confirmDeleteText}
              onChange={this.handleConfirmDeleteText}
              placeholder="DELETE" />
          </div>
          <div className="col-xs-6">
            <ButtonToolbar className="pull-right">
              <Button
                className="confirm-delete"
                disabled={this.state.confirmDeleteText !== 'DELETE'}
                bsStyle="primary"
                type="submit"
              >Confirm</Button>
              {' '}
              <Button
                className="cancel-delete"
                onClick={this.props.toggleConfirmDelete}
              >Cancel</Button>
            </ButtonToolbar>
          </div>
        </div>
      </form>
    );
  }
}
