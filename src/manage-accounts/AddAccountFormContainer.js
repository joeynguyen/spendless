import PouchDB from 'pouchdb';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import AddAccountForm from './AddAccountForm.js';
import { reduxForm } from 'redux-form';
import { saveAccount } from '../account/AccountsActions.js';

class AddAccountFormContainer extends Component {
  static propTypes = {
    doSaveAccount: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
  }
  localHandleSubmit = () => {
    const newAccount = {
      '_id': new Date().toISOString(),
      'name': this.props.fields.accountName.value,
      'type': this.props.fields.accountType.value,
      'company': this.props.fields.accountCompany.value,
    };

    this.props.doSaveAccount(newAccount)
      .then(result => {
        console.log('Successfully added new account', result);
        toastr.success(result.name + ' account added', null, {timeOut: 1500});
        // Reset AddAccount form fields
        this.props.resetForm();
      })
      .catch(error => {
        console.log('Error trying to add account', error);
        toastr.error('Restart the application and retry', 'Error adding account', {timeOut: 1500});
      });
  }
  render() {
    const reduxFormHandleSubmit = this.props.handleSubmit(this.localHandleSubmit);
    return (
      <AddAccountForm
        fields={this.props.fields}
        doSubmit={reduxFormHandleSubmit}
        submitting={this.props.submitting}
      />
    );
  }
}

function validateForm(values) {
  const errors = {};

  if (!values.accountName) {
    errors.accountName = 'Enter an account name';
  }
  if (!values.accountType) {
    errors.accountType = 'Enter an account type';
  }
  if (!values.accountCompany) {
    errors.accountCompany = 'Enter the name of the financial institution';
  }

  return errors;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doSaveAccount: saveAccount,
  }, dispatch);
}

// connect: 1st argument is mapStateToProps, 2nd state is mapDispatchToProps
// reduxForm: 1st argument is form config, 2nd is mapStateToProps, 3rd state is mapDispatchToProps
// initialValues required for resetForm
export default reduxForm(
  {
    form: 'AddAccount',
    fields: ['accountName', 'accountType', 'accountCompany'],
    initialValues: {
      accountName: '',
      accountType: '',
      accountCompany: '',
    },
    validate: validateForm
  },
  null,
  mapDispatchToProps
)(AddAccountFormContainer);
