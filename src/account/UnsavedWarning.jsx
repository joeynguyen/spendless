import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Modal } from 'antd';

const UnsavedWarning = ({
  localHandleAlertLeave,
  localHandleAlertStay,
  show,
}) => {
  return (
    <Modal
      id="UnsavedWarning"
      closable={false}
      visible={show}
      cancelText="No, stay on this page"
      onCancel={localHandleAlertStay}
      okText="Yes, discard changes"
      onOk={localHandleAlertLeave}
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
  localHandleAlertLeave: PropTypes.func.isRequired,
  localHandleAlertStay: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default UnsavedWarning;
