import PouchDB from 'pouchdb';
import React, { Component, PropTypes } from 'react';
import AddAccountForm from './AddAccountForm.js';
import { reduxForm } from 'redux-form';

// PouchDB is loaded externally through a script tag in the browser
const db = new PouchDB('accounts');

class AddAccountFormContainer extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    submitting: PropTypes.bool.isRequired,
  }
  state = {
    alertVisible: false
  }
  hideAlert = () => {
    this.setState({alertVisible: false});
  }
  localHandleSubmit = () => {
    const newAccount = {
      '_id': new Date().toISOString(),
      'name': this.props.fields.accountName.value,
      'type': this.props.fields.accountType.value,
      'company': this.props.fields.accountCompany.value,
    };

    // Save account to DB
    db.put(newAccount).then(result => {
      console.log('Successfully added new account', result);
      // Reset AddAccount form fields
      this.props.resetForm();
      this.setState({alertVisible: true});
      // TODO: Add success message after successful submit
    }).catch(err => {
      console.log('Error trying to add account', err);
      // TODO: Add error message after submit fail
    });
  }
  render() {
    const reduxFormHandleSubmit = this.props.handleSubmit(this.localHandleSubmit);
    return (
      <AddAccountForm
        alertVisible={this.state.alertVisible}
        hideAlert={this.hideAlert}
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

// connect: 1st argument is mapStateToProps, 2nd state is mapDispatchToProps
// reduxForm: 1st argument is form config, 2nd is mapStateToProps, 3rd state is mapDispatchToProps
// initialValues required for resetForm
export default reduxForm({
  form: 'AddAccount',
  fields: ['accountName', 'accountType', 'accountCompany'],
  initialValues: {
    accountName: '',
    accountType: '',
    accountCompany: '',
  },
  validate: validateForm
})(AddAccountFormContainer);
