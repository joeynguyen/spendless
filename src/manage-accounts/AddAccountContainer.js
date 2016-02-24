import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { Button, ButtonInput, Collapse, Panel, Input } from 'react-bootstrap';
import { addAccount } from '../account/AccountsActions.js';
import { toggleAddAccount } from './ManageAccountsActions.js';


// PouchDB is loaded externally through a script tag in the browser
const db = new PouchDB('accounts');

class AddAccountContainer extends Component {
  static propTypes = {
    addAccountVisible: PropTypes.bool.isRequired,
    doAddAccount: PropTypes.func.isRequired,
    doToggleAddAccount: PropTypes.func.isRequired,
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
    const self = this;
    console.log(newAccount);

    // Save account to DB
    db.put(newAccount).then(function(result) {
      console.log('Successfully added new account', result);
      // Update app state
      self.props.doAddAccount(newAccount);
      // TODO: Add success message after successful submit
    }).catch(function(err) {
      console.log(err);
      // TODO: Add error message after submit fail
    });
  }
  render() {
    // handleSubmit, resetForm, and fields are from redux-form
    // const accountName = this.props.fields.accountName;
    const { fields: { accountName, accountType, accountCompany }, handleSubmit, resetForm, submitting } = this.props;

    const addButtonClick = () => {
      this.props.doToggleAddAccount();
      resetForm();
    };
    let addButton = { style: 'primary', class: 'fa fa-plus', text: ' Add Account' };
    if (this.props.addAccountVisible) {
      addButton = { style: 'danger', class: '', text: 'Cancel' };
    }
    return (
      <div>
        <Button onClick={addButtonClick} bsStyle={addButton.style} bsSize="large" block>
          <i className={addButton.class}></i>
          {addButton.text}
        </Button>
        <Panel collapsible expanded={this.props.addAccountVisible}>
          <form onSubmit={handleSubmit(this.localHandleSubmit)}>
            <Input
              type="text"
              label="Name"
              placeholder="Enter a name for the account"
              bsStyle={accountName.touched && accountName.invalid ? 'error' : null}
              help={accountName.touched ? accountName.error : ''}
              {...accountName}
            />
            <Input
              type="select"
              label="Type"
              placeholder="Type"
              bsStyle={accountType.touched && accountType.invalid ? 'error' : null}
              help={accountType.touched ? accountType.error : ''}
              {...accountType}
              value={accountType.value || ''}  // required syntax for reset form to work
                                               // undefined will not change value to first empty option
                                               // when resetting
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
                  bsStyle={accountCompany.touched && accountCompany.invalid ? 'error' : null}
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
                  bsStyle={accountCompany.touched && accountCompany.invalid ? 'error' : null}
                  help={accountCompany.touched ? accountCompany.error : ''}
                  {...accountCompany}
                  value={accountCompany.value || ''} // required syntax for reset form to work
                                                     // undefined will not change value to first empty option
                                                     // when resetting
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

            <ButtonInput
              bsStyle="primary"
              type="submit"
              disabled={submitting}
              value="Save" />
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

function mapStateToProps(state) {
  return {
    addAccountVisible: state.addAccountVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doAddAccount: addAccount,
    doToggleAddAccount: toggleAddAccount,
  }, dispatch);
}

// connect: 1st argument is mapStateToProps, 2nd state is mapDispatchToProps
// reduxForm: 1st argument is form config, 2nd is mapStateToProps, 3rd state is mapDispatchToProps

export default reduxForm({
  form: 'AddAccountForm',
  fields: ['accountName', 'accountType', 'accountCompany'],
  initialValues: {
    accountName: '',
    accountType: '',
    accountCompany: '',
  },
  validate: validateForm
}, mapStateToProps, mapDispatchToProps)(AddAccountContainer);