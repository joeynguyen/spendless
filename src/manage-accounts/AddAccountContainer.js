import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { Button, ButtonInput, Collapse, Panel, Input } from 'react-bootstrap';
import { addAccount } from '../account/AccountsActions.js';

// PouchDB is loaded externally through a script tag in the browser
const db = new PouchDB('accounts');

class AddAccountContainer extends Component {
  static propTypes = {
    doAddAccount: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
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
  // handleAccountTypeChange = (e) => {
  //   if (e.target.value === 'creditcard') {
  //     this.setState({accountCompany: ''});
  //   } else if (e.target.value === 'bank') {
  //     this.setState({accountCompany: ''});
  //   } else {
  //     this.setState({ accountCompany: ''});
  //   }
  // }
  onSubmit = (e) => {
    e.preventDefault();
    const newAccount = {
      '_id': new Date().toISOString(),
      'name': this.props.fields.accountName.value,
      'type': this.props.fields.accountType.value,
      'company': this.props.fields.accountCompany.value,
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
    // handleSubmit and fields are from redux-form
    // const title = this.props.fields.title;
    // const handleSubmit = this.props.handleSubmit;
    const { fields: { accountName, accountType, accountCompany }, handleSubmit } = this.props;

    let addButton = { style: 'primary', class: 'fa fa-plus', text: ' Add Account' };
    if (this.state.showAdd) {
      addButton = { style: 'danger', class: '', text: 'Cancel' };
    }
    return (
      <div>
        <Button onClick={this.toggleAddAccount} bsStyle={addButton.style} bsSize="large" block>
          <i className={addButton.class}></i>
          {addButton.text}
        </Button>
        <Panel collapsible expanded={this.state.showAdd}>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <Input
              type="text"
              label="Name"
              placeholder="Enter a name for the account"
              bsStyle={accountName.touched && accountName.invalid ? 'error' : ''}
              help={accountName.touched ? accountName.error : ''}
              {...accountName}
            />
            <Input
              type="select"
              label="Type"
              placeholder="Type"
              bsStyle={accountType.touched && accountType.invalid ? 'error' : ''}
              help={accountType.touched ? accountType.error : ''}
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
                  placeholder="Enter the name of the financial institution"
                  bsStyle={accountCompany.touched && accountCompany.invalid ? 'error' : ''}
                  help={accountCompany.touched ? accountCompany.error : ''}
                  {...accountCompany}
                />
              </div>
            </Collapse>
            <Collapse in={accountType.value === 'creditcard'}>
              <div>
                <Input
                  type="select"
                  label="Credit Card Company"
                  placeholder="Credit Card Company"
                  bsStyle={accountCompany.touched && accountCompany.invalid ? 'error' : ''}
                  help={accountCompany.touched ? accountCompany.error : ''}
                  {...accountCompany}
                >
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
              value="Add" />
          </form>
        </Panel>
      </div>
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
  return bindActionCreators({ doAddAccount: addAccount }, dispatch);
}

// connect: 1st argument is mapStateToProps, 2nd state is mapDispatchToProps
// reduxForm: 1st argument is form config, 2nd is mapStateToProps, 3rd state is mapDispatchToProps

export default reduxForm({
  form: 'AddAccountForm',
  fields: ['accountName', 'accountType', 'accountCompany'],
  validate: validateForm
}, null, mapDispatchToProps)(AddAccountContainer);
