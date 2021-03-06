import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form } from 'antd';

export default function withEditAccountHandler(OriginalComponent) {
  class WrapperClass extends Component {
    handleUpdateAccount = e => {
      e.preventDefault();

      this.props.form.validateFields((err, values) => {
        if (!err) {
          const newAccountObj = Object.assign({}, this.props.account, {
            company: values.companyName,
            name: values.accountName,
            type: values.accountType,
          });

          // Update account in DB
          this.props.saveToDB(newAccountObj);
        }
      });
    };

    render() {
      return (
        <OriginalComponent
          form={this.props.form}
          handleUpdateAccount={this.handleUpdateAccount}
          {...this.props}
        />
      );
    }
  }

  WrapperClass.propTypes = {
    account: PropTypes.object.isRequired,
    activeAccountId: PropTypes.string,
    form: PropTypes.object.isRequired,
    saveToDB: PropTypes.func.isRequired,
  };

  return Form.create({
    mapPropsToFields(props) {
      return {
        accountName: Form.createFormField({
          ...props.accountName,
          value: props.initialValues.accountName,
        }),
        accountType: Form.createFormField({
          ...props.accountType,
          value: props.initialValues.accountType,
        }),
        companyName: Form.createFormField({
          ...props.companyName,
          value: props.initialValues.accountCompany,
        }),
      };
    },
  })(WrapperClass);
}
