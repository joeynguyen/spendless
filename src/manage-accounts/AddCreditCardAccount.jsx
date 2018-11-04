import PropTypes from 'prop-types';
import React from 'react';
import { Button, Select, Input } from 'antd';

import { renderAntdOptions } from '../utils/helpers.js';
import { accountCompanyOptions } from '../constants.js';

const AddCreditCardAccount = ({ FormItem, getFieldDecorator }) => {
  return (
    <>
      {/* hidden field to pass on save data */}
      {getFieldDecorator('accountType', { initialValue: 'creditcard' })(
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

      <FormItem label="Credit Card Company">
        {getFieldDecorator('companyName', {
          rules: [
            {
              message: 'Enter the name of the financial institution',
              required: true,
            },
          ],
        })(<Select>{renderAntdOptions(accountCompanyOptions)}</Select>)}
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
    </>
  );
};

AddCreditCardAccount.propTypes = {
  FormItem: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
};

export default AddCreditCardAccount;
