import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Form, Input, Popconfirm } from 'antd';

import withEditAccountHandler from './EditAccountHandler.jsx';

const FormItem = Form.Item;

class EditBankAccount extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.props.handleUpdateAccount} layout="vertical">
        {/* hidden field to pass on save data. initialValue will be passed in from mapPropsToFields */}
        {getFieldDecorator('accountType')(<Input type="hidden" />)}

        <FormItem label="Name">
          {getFieldDecorator('accountName', {
            rules: [
              { required: true, message: 'Enter a name for the account' },
            ],
          })(<Input placeholder="Enter a name for the account" />)}
        </FormItem>

        <FormItem label="Bank">
          {getFieldDecorator('companyName', {
            rules: [
              {
                required: true,
                message: 'Enter the name of the financial institution',
              },
            ],
          })(
            <Input placeholder="Enter the name of the financial institution" />
          )}
        </FormItem>

        <FormItem>
          <Button
            name="update-account"
            type="primary"
            htmlType="submit"
            size="large"
          >
            Save
          </Button>
          <Button
            name="cancel"
            onClick={this.props.toggleSettings}
            size="large"
          >
            Cancel
          </Button>
        </FormItem>
        <Popconfirm
          onConfirm={this.props.removeFromDB}
          title="Are you sure you want to delete this account?"
          okText="Yes"
          cancelText="No"
        >
          <Button name="delete-toggle" size="large" type="danger">
            Delete
          </Button>
        </Popconfirm>
      </Form>
    );
  }
}

EditBankAccount.propTypes = {
  form: PropTypes.object.isRequired,
  removeFromDB: PropTypes.func.isRequired,
  handleUpdateAccount: PropTypes.func.isRequired,
  // to be used by withEditAccountHandler
  saveToDB: PropTypes.func.isRequired,
  toggleSettings: PropTypes.func.isRequired,
};

export default withEditAccountHandler(EditBankAccount);
