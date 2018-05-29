import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form, Radio } from 'antd';

import AddBankAccount from './AddBankAccount.jsx';
import AddCreditCardAccount from './AddCreditCardAccount.jsx';

const FormItem = Form.Item;

export class AddAccountForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;

    const accountTypeSelected = this.props.form.getFieldValue('accountType');
    let accountTypeForm;
    if (accountTypeSelected === 'bank') {
      accountTypeForm = <AddBankAccount />;
    } else {
      accountTypeForm = <AddCreditCardAccount />;
    }

    return (
      <div className="well">
        <Form layout="vertical">
          <FormItem label="Type">
            {getFieldDecorator('accountType', {
              initialValue: 'bank',
            })(
              <Radio.Group>
                <Radio.Button value="bank">Bank</Radio.Button>
                <Radio.Button value="creditcard">Credit Card</Radio.Button>
              </Radio.Group>
            )}
          </FormItem>
        </Form>

        {accountTypeForm}
      </div>
    );
  }
}

AddAccountForm.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Form.create({})(AddAccountForm);
