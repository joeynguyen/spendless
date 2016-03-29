import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Collapse, Input, Button, Alert } from 'react-bootstrap';
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

  handleUpdateAccount = (accountToUpdate) => {
    const self = this;
    const newAccountObj = Object.assign({}, accountToUpdate, {
      name: this.props.fields.accountName.value,
      type: this.props.fields.accountType.value,
      company: this.props.fields.accountCompany.value,
    });
    // Update account in DB
    db.put(newAccountObj).then(function(result) {
      console.log('Successfully updated account', result);
      self.setState({alertVisible: true});
    }).catch(function(err) {
      console.log(err);
      // TODO: Add error message after update fail
    });
  }

  render() {
    const { fields: { accountName, accountType, accountCompany } } = this.props;
    let alertMessage;

    if (this.state.alertVisible) {
      alertMessage = (
        <div>
          <br />
          <Alert bsStyle="success" onDismiss={this.hideAlert} dismissAfter={2000}>
            <p>Account updated successfully!</p>
          </Alert>
        </div>
      );
    }
    return (
      <div>
        <form>
          <Input
            type="text"
            label="Name"
            {...accountName}
          />
          <Input
            type="select"
            label="Type"
            {...accountType}
          >
            <option value="">select...</option>
            <option value="bank">Bank</option>
            <option value="creditcard">Credit Card</option>
          </Input>
          <Collapse in={accountType.value === 'bank'}>
            <div>
              <Input
                type="text"
                label="Name of Institution"
                {...accountCompany}
              />
            </div>
          </Collapse>
          <Collapse in={accountType.value === 'creditcard'}>
            <div>
              <Input
                type="select"
                label="Credit Card Company"
                {...accountCompany}
              >
                <option value="">select...</option>
                <option value="Visa">Visa</option>
                <option value="MasterCard">Mastercard</option>
                <option value="American Express">American Express</option>
                <option value="Discover">Discover</option>
                <option value="Diners Club">Diners Club</option>
                <option value="JCB">JCB</option>
                <option value="Other">Other</option>
              </Input>
            </div>
          </Collapse>
          <Button
            disabled={this.props.pristine}
            onClick={() => this.handleUpdateAccount(this.props.account)}
            bsStyle="success"
          >Update</Button>
          {' '}
          <Button
            onClick={this.props.toggleSettings}
          >Cancel</Button>
          <Button
            className="pull-right"
            disabled={this.state.confirmDeleteVisible}
            onClick={this.toggleConfirmDelete}
            bsStyle="danger"
          >Delete</Button>
        </form>
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
