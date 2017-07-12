import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
// import toastr from 'toastr';
import { Form } from 'antd';
// import * as accountsActions from '../account/AccountsActions.js';

export default function withAddAccountHandler(OriginalComponent) {
  class WrappingClass extends Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
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

  WrappingClass.propTypes = {
    form: PropTypes.object.isRequired,
  };

  return Form.create({})(WrappingClass);
}
