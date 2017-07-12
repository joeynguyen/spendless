import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Form, Select, Input } from 'antd';
import { renderAntdOptions } from '../utils/helpers.js';
import { accountCompanyOptions } from '../constants.js';

const FormItem = Form.Item;

export class AddCreditCardAccount extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} layout="vertical">
        {getFieldDecorator('accountType', {initialValue: 'creditcard'})(<Input type="hidden" />)}

        <FormItem
          label="Name"
        >
          {getFieldDecorator('accountName', {
            rules: [{ required: true, message: 'Enter a name for the account' }],
          })(
            <Input placeholder="Enter a name for the account" />
          )}
        </FormItem>

        <FormItem label="Credit Card Company">
          {getFieldDecorator('companyName', {
            rules: [{ required: true, message: 'Enter the name of the financial institution' }],
          })(
            <Select>{renderAntdOptions(accountCompanyOptions)}</Select>
          )}
        </FormItem>

        <FormItem>
          <Button
            name="add-account"
            type="primary"
            htmlType="submit"
            size="large"
          >Save</Button>
        </FormItem>
      </Form>
    );
  }
}

AddCreditCardAccount.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Form.create({})(AddCreditCardAccount);

