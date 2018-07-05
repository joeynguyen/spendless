import PropTypes from 'prop-types';
import React from 'react';
import { Form, Radio } from 'antd';

import AccountTypeFormContainer from './AccountTypeFormContainer.jsx';

const FormItem = Form.Item;

const AddAccountForm = ({ form }) => {
  const { getFieldDecorator } = form;

  const accountTypeSelected = form.getFieldValue('accountType');

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

      <AccountTypeFormContainer accountType={accountTypeSelected} />
    </div>
  );
};

AddAccountForm.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Form.create({})(AddAccountForm);
