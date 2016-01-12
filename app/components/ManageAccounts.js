import React, { Component, PropTypes } from 'react';
import { Modal, Button, ButtonInput, Collapse, Panel, Input } from 'react-bootstrap';
import ApiKey from '../api-key.js';

// PouchDB is loaded externally through a script tag in the browser
const db = new PouchDB('accounts');
let remoteCouch = false;
if (ApiKey.user !== '' && ApiKey.pass !== '') {
  remoteCouch = `http://${ApiKey.user}:${ApiKey.pass}@joeynguyen.cloudant.com/spendless-accounts`;
}

export default class ManageAccountsWindow extends Component {
  static propTypes = {
    onNewAccount: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
  }
  state = {
    accountName: '',
    accountType: '',
    accountCompany: '',
    showAdd: false,
    showBank: false,
    showCredit: false
  }
  syncDB() {
    const opts = {live: true};
    db.sync(remoteCouch, opts)
      .on('complete', function(success) {
        console.log('CouchDB sync success :', success);
      })
      .on('error', function(err) {
        console.log('CouchDB sync error :', err);
      });
  }
  toggleAddAccount = () => {
    this.setState({showAdd: !this.state.showAdd});
  }
  closeWindow = () => {
    this.setState({showAdd: false, showBank: false, showCredit: false});
    this.props.close();
  }
  handleAccountNameChange = (e) => {
    this.setState({accountName: e.target.value});
  }
  handleAccountTypeChange = (e) => {
    if (e.target.value === 'creditcard') {
      this.setState({showCredit: true, showBank: false, accountCompany: ''});
    } else if (e.target.value === 'bank') {
      this.setState({showBank: true, showCredit: false, accountCompany: ''});
    } else {
      this.setState({showCredit: false, showBank: false});
    }
    this.setState({accountType: e.target.value});
  }
  handleAccountCompanyChange = (e) => {
    this.setState({accountCompany: e.target.value});
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const newAccount = {
      '_id': new Date().toISOString(),
      'name': this.state.accountName,
      'type': this.state.accountType,
      'company': this.state.accountCompany,
    };
    const self = this;
    console.log(newAccount);
    db.put(newAccount).then(function(result) {
      console.log('Successfully added new account');
      console.log(result);
      self.updateAccounts(newAccount);
      self.setState({showAdd: false, showBank: false, showCredit: false});
      // TODO: reset form inputs
      // TODO: Add success message after successful submit
    }).catch(function(err) {
      console.log(err);
      // TODO: Add error message after submit fail
    });
    if (remoteCouch) {
      this.syncDB();
    }
  }
  updateAccounts = (newAccount) => {
    this.props.onNewAccount(newAccount);
  }
  render() {
    let addButton = {};
    if (this.state.showAdd) {
      addButton = { style: 'danger', class: '', text: 'Cancel' };
    } else {
      addButton = { style: 'primary', class: 'fa fa-plus', text: ' Add Account' };
    }
    return (
      <Modal show={this.props.showModal} onHide={this.closeWindow}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Accounts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-xs-8">
              <Button onClick={this.toggleAddAccount} bsStyle={addButton.style} bsSize="large" block><i className={addButton.class}></i>{addButton.text}</Button>
              <Panel collapsible expanded={this.state.showAdd}>
                {/* TODO: Add form validation. Don't allow 'select' value to be chosen */}
                <form onSubmit={this.handleSubmit}>
                  <Input type="text" label="Name" placeholder="Enter a name for the account" value={this.state.accountName} onChange={this.handleAccountNameChange} />
                  <Input type="select" label="Type" placeholder="Type" value={this.state.accountType} onChange={this.handleAccountTypeChange} >
                    <option value="select">select</option>
                    <option value="bank">Bank</option>
                    <option value="creditcard">Credit Card</option>
                  </Input>

                  <Collapse in={this.state.showBank}>
                    <div>
                      <Input type="text" label="Name of Institution" placeholder="Enter the name of the financial institution" value={this.state.accountCompany} onChange={this.handleAccountCompanyChange } />
                    </div>
                  </Collapse>
                  <Collapse in={this.state.showCredit}>
                    <div>
                      <Input type="select" label="Credit Card Company" placeholder="Credit Card Company" value={this.state.accountCompany} onChange={this.handleAccountCompanyChange}>
                        <option value="select">select</option>
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

                  <ButtonInput bsStyle="primary" type="submit" value="Add" />
                </form>
              </Panel>
              <hr />
              {/* Use state to display 'No accounts' */}
              <p>No accounts found.</p>
            </div>

            <div className="col-xs-4">
              <ul>
                <li>1 Checking accounts</li>
                <li>2 Credit card accounts</li>
              </ul>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeWindow}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
