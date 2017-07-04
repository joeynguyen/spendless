import PropTypes from 'prop-types';
import React from 'react';
import { Button, Modal } from 'antd';

import FieldGroup from '../custom-components/FieldGroup.jsx';

const ManageTransaction = ({ manageType = 'add', fields, manageTransactionVisible, toggleManageTransaction, pristine = true, doSubmit }) => {
  const { date, description, category, amount, notes } = fields;
  const componentTitle = (manageType === 'edit') ? 'Edit Transaction' : 'Add Transaction';
  const modalFooter = [(
    <Button
      key="confirm"
      type="primary"
      disabled={pristine}
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
      <form id="manage-transaction" onSubmit={doSubmit}>
        <FieldGroup
          type="text"
          label="Description"
          name={description.name}
          error={description.error}
          invalid={description.invalid}
          touched={description.touched}
          onBlur={description.onBlur}
          onChange={description.onChange}
          onFocus={description.onFocus}
          value={description.value}
        />
        <FieldGroup
          type="date"
          label="Date"
          name={date.name}
          error={date.error}
          invalid={date.invalid}
          touched={date.touched}
          onBlur={date.onBlur}
          onChange={date.onChange}
          onFocus={date.onFocus}
          value={date.value}
        />
        <FieldGroup
          type="text"
          label="Category"
          name={category.name}
          error={category.error}
          invalid={category.invalid}
          touched={category.touched}
          onBlur={category.onBlur}
          onChange={category.onChange}
          onFocus={category.onFocus}
          value={category.value}
        />
        <FieldGroup
          type="text"
          addonBefore="$"
          label="Amount"
          name={amount.name}
          error={amount.error}
          invalid={amount.invalid}
          touched={amount.touched}
          onBlur={amount.onBlur}
          onChange={amount.onChange}
          onFocus={amount.onFocus}
          value={amount.value}
        />
        <FieldGroup
          componentClass="textarea"
          label="Notes"
          placeholder="Add notes for this transaction"
          name={notes.name}
          error={notes.error}
          invalid={notes.invalid}
          touched={notes.touched}
          onBlur={notes.onBlur}
          onChange={notes.onChange}
          onFocus={notes.onFocus}
          value={notes.value}
        />
      </form>
    </Modal>
  );
};
ManageTransaction.propTypes = {
  manageType: PropTypes.string.isRequired,
  toggleManageTransaction: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  doSubmit: PropTypes.func.isRequired,
};

export default ManageTransaction;
