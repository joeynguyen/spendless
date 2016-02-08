import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ButtonInput, Collapse, Panel, Input } from 'react-bootstrap';
import RaisedButton from 'material-ui/lib/raised-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add.js';
import RemoveIcon from 'material-ui/lib/svg-icons/content/remove.js';
import { addAccount } from '../account/AccountsActions.js';

const styles = {
  buttonLabel: {
    fontSize: 17
  }
};
// PouchDB is loaded externally through a script tag in the browser
const db = new PouchDB('accounts');

class AddAccountContainer extends Component {
  static propTypes = {
    doAddAccount: PropTypes.func.isRequired
  }
  state = {
    accountName: '',
    accountType: '',
    accountCompany: '',
    showAdd: false,
    showBank: false,
    showCredit: false
  }
  toggleAddAccount = () => {
    this.setState({showAdd: !this.state.showAdd, accountName: '', accountType: '', accountCompany: ''});
  }
  handleAccountNameChange = (e) => {
    this.setState({accountName: e.target.value});
  }
  handleAccountTypeChange = (e) => {
    if (e.target.value === 'creditcard') {
      this.setState({showCredit: true, showBank: false, accountCompany: ''});
    } else if (e.target.value === 'bank') {
      this.setState({showCredit: false, showBank: true, accountCompany: ''});
    } else {
      this.setState({showCredit: false, showBank: false, accountCompany: ''});
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

    // Save account to DB
    db.put(newAccount).then(function(result) {
      console.log('Successfully added new account');
      console.log(result);
      // Update app state
      self.props.doAddAccount(newAccount);
      // Reset input fields to blank
      self.setState({showAdd: false, showBank: false, showCredit: false, accountName: '', accountType: '', accountCompany: ''});
      // TODO: Add success message after successful submit
    }).catch(function(err) {
      console.log(err);
      // TODO: Add error message after submit fail
    });
  }
  render() {
    return (
      <div>
        <RaisedButton
          onClick={this.toggleAddAccount}
          label={this.state.showAdd ? 'Cancel' : 'Add Account'}
          fullWidth={true}
          secondary={!this.state.showAdd}
          primary={this.state.showAdd}
          icon={this.state.showAdd ? <RemoveIcon viewBox="0 2 24 24"/> : <AddIcon viewBox="0 2 24 24"/>}
          labelStyle={styles.buttonLabel}
        />

        <Panel collapsible expanded={this.state.showAdd}>
          {/* TODO: Add form validation. Don't allow 'select' value to be chosen */}
          <form onSubmit={this.handleSubmit}>
            <Input type="text" label="Name" placeholder="Enter a name for the account" value={this.state.accountName} onChange={this.handleAccountNameChange} />
            <Input type="select" label="Type" placeholder="Type" value={this.state.accountType} onChange={this.handleAccountTypeChange} >
              <option value="">select</option>
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
                  <option value="">select</option>
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

            <ButtonInput
              bsStyle="primary"
              type="submit"
              disabled={!(this.state.accountName.length > 0 &&
                          this.state.accountType.length > 0 &&
                          this.state.accountCompany.length > 0)}
              value="Save" />
          </form>
        </Panel>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doAddAccount: addAccount }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddAccountContainer);
