import PouchDB from 'pouchdb';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Collapse } from 'react-bootstrap';
import toastr from 'toastr';
import EditAccountForm from './EditAccountForm.js';
import DeleteAccountFormContainer from './DeleteAccountFormContainer.js';

// PouchDB is loaded externally through a script tag in the browser
const db = new PouchDB('accounts');

class EditAccountFormContainer extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    toggleSettings: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    resetForm: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
  }

  state = {
    confirmDeleteVisible: false,
  }

  toggleConfirmDelete = () => {
    this.setState({ confirmDeleteVisible: !this.state.confirmDeleteVisible });
  }

  handleUpdateAccount = (e) => {
    e.preventDefault();

    const newAccountObj = Object.assign({}, this.props.account, {
      name: this.props.fields.accountName.value,
      type: this.props.fields.accountType.value,
      company: this.props.fields.accountCompany.value,
    });
    // Update account in DB
    db.put(newAccountObj).then(result => {
      console.log('Successfully updated account', result);
      toastr.success('Account updated', null, {timeOut: 1500});
    }).catch(err => {
      console.log(err);
      toastr.error('Restart the application and retry', 'Error updating account', {timeOut: 1500});
      // TODO: Add error message after update fail
    });
  }

  render() {
    return (
      <div>
        <EditAccountForm
          fields={this.props.fields}
          pristine={this.props.pristine}
          toggleSettings={this.props.toggleSettings}
          confirmDeleteVisible={this.state.confirmDeleteVisible}
          toggleConfirmDelete={this.toggleConfirmDelete}
          handleUpdateAccount={this.handleUpdateAccount}
        />
        <Collapse in={this.state.confirmDeleteVisible}>
          <div>
            <DeleteAccountFormContainer
              account={this.props.account}
              toggleConfirmDelete={this.toggleConfirmDelete}
            />
          </div>
        </Collapse>
      </div>
    );
  }
}

export default reduxForm(
  {
    form: 'EditAccount',
    fields: ['accountName', 'accountType', 'accountCompany'],
  },
)(EditAccountFormContainer);
