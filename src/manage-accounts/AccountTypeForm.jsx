import PropTypes from 'prop-types';
import React from 'react';
import { Form, message } from 'antd';
import AddBankAccount from './AddBankAccount';
import AddCreditCardAccount from './AddCreditCardAccount';

const AccountTypeForm = props => {
  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const newAccount = {
          _id: new Date().toISOString(),
          company: values.companyName,
          name: values.accountName,
          type: values.accountType,
        };

        props
          .saveAccount(newAccount)
          .then(result => {
            message.success(`${result.name} account added`);
            props.form.resetFields();
          })
          .catch(() => {
            message.error('Restart the application and retry');
          });
      }
    });
  }

  let accountForm = (
    <AddBankAccount
      getFieldDecorator={props.form.getFieldDecorator}
      FormItem={Form.Item}
    />
  );

  if (props.accountType === 'creditcard') {
    accountForm = (
      <AddCreditCardAccount
        getFieldDecorator={props.form.getFieldDecorator}
        FormItem={Form.Item}
      />
    );
  }

  return (
    <Form onSubmit={handleSubmit} layout="vertical">
      {accountForm}
    </Form>
  );
};

AccountTypeForm.propTypes = {
  accountType: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  saveAccount: PropTypes.func.isRequired,
};

export default Form.create({})(AccountTypeForm);
