import React, { PropTypes } from 'react';
import { Input, Button, ButtonToolbar } from 'react-bootstrap';

const DeleteAccountForm = ({ confirmDeleteText, handleConfirmDeleteText, handleDeleteAccount, toggleConfirmDelete }) => {
  return (
    <form onSubmit={handleDeleteAccount}>
      <hr />
      <p>Type DELETE into this box to confirm</p>
      <div className="row">
        <div className="col-xs-6">
          <Input
            type="text"
            value={confirmDeleteText}
            onChange={handleConfirmDeleteText}
            placeholder="DELETE" />
        </div>
        <div className="col-xs-6">
          <ButtonToolbar className="pull-right">
            <Button
              disabled={confirmDeleteText !== 'DELETE'}
              bsStyle="primary"
              groupClassName="horizontal-button-group"
              type="submit"
            >Confirm</Button>
            {' '}
            <Button
              onClick={toggleConfirmDelete}
            >Cancel</Button>
          </ButtonToolbar>
        </div>
      </div>
    </form>
  );
};
DeleteAccountForm.propTypes = {
  confirmDeleteText: PropTypes.string.isRequired,
  handleConfirmDeleteText: PropTypes.func.isRequired,
  handleDeleteAccount: PropTypes.func.isRequired,
  toggleConfirmDelete: PropTypes.func.isRequired,
};

export default DeleteAccountForm;
