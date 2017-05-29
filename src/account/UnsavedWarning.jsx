import PropTypes from 'prop-types';
import React from 'react';
import { Modal, Alert, Button } from 'react-bootstrap';

const UnsavedWarning = ({ localHandleAlertStay, localHandleAlertLeave, show }) => {
  return (
    <Modal show={show} backdrop="static">
      <Alert bsStyle="danger" style={{marginBottom: 0}}>
        <h4>You have unsaved changes!</h4>
        <p>Navigating away from this page without clicking the Save button will cause your unsaved changes to be discarded. Are you sure you want to leave this page?</p>
        <p>
          <Button onClick={localHandleAlertStay}>No, stay on this page</Button>
          <span> or </span>
          <Button onClick={localHandleAlertLeave}>Yes, discard changes</Button>
        </p>
      </Alert>
    </Modal>
  );
};
UnsavedWarning.propTypes = {
  localHandleAlertStay: PropTypes.func.isRequired,
  localHandleAlertLeave: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default UnsavedWarning;
