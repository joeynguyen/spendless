import PropTypes from 'prop-types';
import React from 'react';
import { Button, DatePicker, Form, Input, Modal } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const UploadedTransactions = ({ uploadedTransactionsModalVisible, toggleUploadedTransactionsModal }) => {
  const modalFooter = [(
    <Button
      key="confirm"
      type="primary"
      htmlType="submit"
      form="uploaded-transactions"
    >Save</Button>
  ), (
    <Button
      key="cancel"
      id="cancel-manage-uploaded-transactions"
      size="large"
      onClick={toggleUploadedTransactionsModal}
    >Cancel</Button>
  )];

  return (
    <Modal
      id="UploadedTransactions"
      closable
      maskClosable={false}
      visible={uploadedTransactionsModalVisible}
      onCancel={toggleUploadedTransactionsModal}
      title="Manage Uploaded Transactions"
      footer={modalFooter}
    >
    </Modal>
  );
};

UploadedTransactions.propTypes = {
  uploadedTransactionsModalVisible: PropTypes.bool.isRequired,
  toggleUploadedTransactionsModal: PropTypes.func.isRequired,
};

export default UploadedTransactions;
