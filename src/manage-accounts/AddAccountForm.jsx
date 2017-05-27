import React, { PropTypes } from 'react';
import { Button, Collapse, ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

const AddAccountForm = ({ localHandleSubmit, fields, submitting }) => {
  // fields and submitting are from redux-form
  const { accountName, accountType, accountCompany } = fields;
  let accountTypeField = '';
  if (accountType.value === 'bank') {
    accountTypeField = (
      <FormGroup
        controlId={accountCompany.name}
        placeholder="Enter the name of the financial institution"
        validationState={accountCompany.touched && accountCompany.invalid ? 'error' : null}
      >
        <ControlLabel>Name of Institution</ControlLabel>
        <FormControl
          type="text"
          placeholder="Enter the name of the financial institution"
          {...accountCompany}
        />
        {accountCompany.touched && <HelpBlock>{accountCompany.error}</HelpBlock>}
      </FormGroup>
    );
  } else if (accountType.value === 'creditcard') {
    accountTypeField = (
      <FormGroup
        controlId={accountCompany.name}
        validationState={accountCompany.touched && accountCompany.invalid ? 'error' : null}
      >
        <ControlLabel>Credit Card Company</ControlLabel>
        <FormControl
          componentClass="select"
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
        </FormControl>
        {accountCompany.touched && <HelpBlock>{accountCompany.error}</HelpBlock>}
      </FormGroup>
    );
  }

  return (
    <form id="add-account-form" onSubmit={localHandleSubmit}>
      <FormGroup
        controlId={accountName.name}
        placeholder="Enter a name for the account"
        validationState={accountName.touched && accountName.invalid ? 'error' : null}
      >
        <ControlLabel>Name</ControlLabel>
        <FormControl
          type="text"
          placeholder="Enter a name for the account"
          {...accountName}
        />
        {accountName.touched && <HelpBlock>{accountName.error}</HelpBlock>}
      </FormGroup>

      <FormGroup
        controlId={accountType.name}
        validationState={accountType.touched && accountType.invalid ? 'error' : null}
      >
        <ControlLabel>Type</ControlLabel>
        <FormControl
          componentClass="select"
          {...accountType}
        >
          <option value="">select...</option>
          <option value="bank">Bank</option>
          <option value="creditcard">Credit Card</option>
        </FormControl>
        {accountType.touched && <HelpBlock>{accountType.error}</HelpBlock>}
      </FormGroup>

      <Collapse in={accountType.value !== ''}>
        <div>{accountTypeField}</div>
      </Collapse>

      <Button
        name="add-account"
        bsStyle="primary"
        type="submit"
        disabled={submitting}>
        {submitting ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
};

AddAccountForm.propTypes = {
  localHandleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default AddAccountForm;
