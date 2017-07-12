import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';

const FormItem = Form.Item;

export class AddBankAccount extends Component {
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
        {getFieldDecorator('accountType', {initialValue: 'bank'})(<Input type="hidden" />)}

        <FormItem
          label="Name"
        >
          {getFieldDecorator('accountName', {
            rules: [{ required: true, message: 'Enter a name for the account' }],
          })(
            <Input placeholder="Enter a name for the account" />
          )}
        </FormItem>

        <FormItem label="Bank">
          {getFieldDecorator('companyName', {
            rules: [{ required: true, message: 'Enter the name of the financial institution' }],
          })(
            <Input placeholder="Enter the name of the financial institution" />
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

AddBankAccount.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Form.create({})(AddBankAccount);
