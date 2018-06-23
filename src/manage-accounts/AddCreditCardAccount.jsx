import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Form, Select, Input } from 'antd';

import withAddAccountHandler from './AddAccountHandler.jsx';
import { renderAntdOptions } from '../utils/helpers.js';
import { accountCompanyOptions } from '../constants.js';

const FormItem = Form.Item;

class AddCreditCardAccount extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.props.handleSubmit} layout="vertical">
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
      </Form>
    );
  }
}

AddCreditCardAccount.propTypes = {
  form: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withAddAccountHandler(AddCreditCardAccount);
