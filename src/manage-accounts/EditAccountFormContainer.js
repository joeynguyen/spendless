import PouchDB from 'pouchdb';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Collapse, Alert } from 'react-bootstrap';
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
    alertVisible: false,
    confirmDeleteVisible: false,
  }

  hideAlert = () => {
    this.setState({alertVisible: false});
  }

  toggleConfirmDelete = () => {
    this.setState({ confirmDeleteVisible: !this.state.confirmDeleteVisible });
  }

  handleUpdateAccount = () => {
    const newAccountObj = Object.assign({}, this.props.account, {
      name: this.props.fields.accountName.value,
      type: this.props.fields.accountType.value,
      company: this.props.fields.accountCompany.value,
    });
    // Update account in DB
    db.put(newAccountObj).then(result => {
      console.log('Successfully updated account', result);
      this.setState({alertVisible: true});
    }).catch(err => {
      console.log(err);
      // TODO: Add error message after update fail
    });
  }

  render() {
    let alertMessage;

    if (this.state.alertVisible) {
      alertMessage = (
        <Alert bsStyle="success" onDismiss={this.hideAlert} dismissAfter={1500}>
          <p>Account updated successfully!</p>
        </Alert>
      );
    }
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
        { alertMessage }
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
