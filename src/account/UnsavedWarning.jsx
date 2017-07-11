import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Button, Modal } from 'antd';

const UnsavedWarning = ({ localHandleAlertStay, localHandleAlertLeave, show }) => {
  const modalFooter = [(
    <Button
      key="cancel"
      size="large"
      onClick={localHandleAlertStay}

    >No, stay on this page</Button>
  ), (
    <Button
      key="confirm"
      type="primary"
      size="large"
      onClick={localHandleAlertLeave}
    >Yes, discard changes</Button>
  )];
  return (
    <Modal
      closable={false}
      visible={show}
      footer={modalFooter}
    >
      <Alert
        type="warning"
        message="You have unsaved changes!"
        description="Navigating away from this page without clicking the Save button will cause your unsaved changes to be discarded. Are you sure you want to leave this page?"
        showIcon
      />
    </Modal>
  );
};
UnsavedWarning.propTypes = {
  localHandleAlertStay: PropTypes.func.isRequired,
  localHandleAlertLeave: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default UnsavedWarning;
