import React, { Component, PropTypes } from 'react';
import { Input, Button, ButtonToolbar } from 'react-bootstrap';

export class DeleteAccountFormContainer extends Component {
  static propTypes = {
    confirmDeleteText: PropTypes.string.isRequired,
    handleDeleteAccount: PropTypes.func.isRequired,
    handleConfirmDeleteText: PropTypes.func.isRequired,
    toggleConfirmDelete: PropTypes.func.isRequired,
  }

  render() {
    return (
      <form onSubmit={this.props.handleDeleteAccount}>
        <hr />
        <p>Type DELETE into this box to confirm</p>
        <div className="row">
          <div className="col-xs-6">
            <Input
              type="text"
              value={this.props.confirmDeleteText}
              onChange={this.props.handleConfirmDeleteText}
              placeholder="DELETE" />
          </div>
          <div className="col-xs-6">
            <ButtonToolbar className="pull-right">
              <Button
                disabled={this.props.confirmDeleteText !== 'DELETE'}
                bsStyle="primary"
                groupClassName="horizontal-button-group"
                type="submit"
              >Confirm</Button>
              {' '}
              <Button
                onClick={this.props.toggleConfirmDelete}
              >Cancel</Button>
            </ButtonToolbar>
          </div>
        </div>
      </form>
    );
  }
}

export default DeleteAccountFormContainer;
