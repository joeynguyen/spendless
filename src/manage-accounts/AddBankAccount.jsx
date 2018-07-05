import PropTypes from 'prop-types';
import React from 'react';
import { Button, Input } from 'antd';

const AddBankAccount = ({ FormItem, getFieldDecorator }) => {
  return (
    <React.Fragment>
      {/* hidden field to pass on save data */}
      {getFieldDecorator('accountType', { initialValue: 'bank' })(
        <Input type="hidden" />
      )}

      <FormItem label="Name">
        {getFieldDecorator('accountName', {
          rules: [
            {
              message: 'Enter a name for the account',
              required: true,
            },
          ],
        })(<Input placeholder="Enter a name for the account" />)}
      </FormItem>

      <FormItem label="Bank">
        {getFieldDecorator('companyName', {
          rules: [
            {
              message: 'Enter the name of the financial institution',
              required: true,
            },
          ],
        })(<Input placeholder="Enter the name of the financial institution" />)}
      </FormItem>

      <FormItem>
        <Button
          name="add-account"
          type="primary"
          htmlType="submit"
          size="large"
        >
          Save
        </Button>
      </FormItem>
    </React.Fragment>
  );
};

AddBankAccount.propTypes = {
  FormItem: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
};

export default AddBankAccount;
