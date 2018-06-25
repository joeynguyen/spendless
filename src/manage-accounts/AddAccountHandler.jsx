import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message } from 'antd';
import { Form } from 'antd';
import * as accountsActions from '../account/AccountsActions.js';

export default function withAddAccountHandler(OriginalComponent) {
  class WrapperClass extends Component {
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const newAccount = {
            _id: new Date().toISOString(),
            company: values.companyName,
            name: values.accountName,
            type: values.accountType,
          };

          this.props.actions
            .saveAccount(newAccount)
            .then(result => {
              message.success(`${result.name} account added`);
              this.props.form.resetFields();
            })
            .catch(() => {
              message.error('Restart the application and retry');
            });
        }
      });
    };
    render() {
      return (
        <OriginalComponent
          form={this.props.form}
          handleSubmit={this.handleSubmit}
          {...this.props}
        />
      );
    }
  }

  WrapperClass.propTypes = {
    actions: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
  };

  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(accountsActions, dispatch),
    };
  }

  return connect(
    null,
    mapDispatchToProps
  )(Form.create({})(WrapperClass));
}
