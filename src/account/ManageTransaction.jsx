import PropTypes from 'prop-types';
import React from 'react';
import { Button, DatePicker, Form, Input, Modal } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const ManageTransaction = ({ form, manageType = 'add', manageTransactionVisible, toggleManageTransaction, doSubmit }) => {
  const { getFieldDecorator } = form;
  const componentTitle = (manageType === 'edit') ? 'Edit Transaction' : 'Add Transaction';
  const modalFooter = [(
    <Button
      key="confirm"
      type="primary"
      htmlType="submit"
      form="manage-transaction"
    >Save</Button>
  ), (
    <Button
      key="cancel"
      id="cancel-manage-transaction"
      size="large"
      onClick={toggleManageTransaction}
    >Cancel</Button>
  )];

  return (
    <Modal
      closable
      maskClosable={false}
      visible={manageTransactionVisible}
      onCancel={toggleManageTransaction}
      title={componentTitle}
      footer={modalFooter}
    >
      <Form id="manage-transaction" onSubmit={doSubmit} layout="vertical">
        <FormItem label="Description">
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Enter a description' }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem label="Date">
          {getFieldDecorator('date', {
            rules: [{ required: true, message: 'Enter a date' }],
          })(
            <DatePicker />
          )}
        </FormItem>

        <FormItem label="Category">
          {getFieldDecorator('category', {
            rules: [{ required: true, message: 'Enter a category' }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem label="Amount">
          {getFieldDecorator('amount', {
            rules: [{ required: true, message: 'Enter an amount' }],
          })(
            <Input addonBefore="$" />
          )}
        </FormItem>

        <FormItem label="Notes">
          {getFieldDecorator('notes', {})(
            <TextArea rows={4} placeholder="Add notes for this transaction"/>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

ManageTransaction.propTypes = {
  form: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  manageTransactionVisible: PropTypes.bool.isRequired,
  manageType: PropTypes.string.isRequired,
  toggleManageTransaction: PropTypes.func.isRequired,
  doSubmit: PropTypes.func.isRequired,
};

export default ManageTransaction;

