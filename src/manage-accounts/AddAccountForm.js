import React, { PropTypes } from 'react';
import { Button, Collapse, Input } from 'react-bootstrap';

const AddAccountForm = ({ doSubmit, fields, submitting }) => {
  // handleSubmit and fields are from redux-form
  const { accountName, accountType, accountCompany } = fields;
  let accountTypeField = '';
  if (accountType.value === 'bank') {
    accountTypeField = (
      <Input
        type="text"
        label="Name of Institution"
        placeholder="Enter the name of the financial institution"
        bsStyle={accountCompany.touched && accountCompany.invalid ? 'error' : null}
        help={accountCompany.touched ? accountCompany.error : ''}
        {...accountCompany}
      />
    );
  } else if (accountType.value === 'creditcard') {
    accountTypeField = (
      <Input
        type="select"
        label="Credit Card Company"
        placeholder="Credit Card Company"
        bsStyle={accountCompany.touched && accountCompany.invalid ? 'error' : null}
        help={accountCompany.touched ? accountCompany.error : ''}
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
    );
  }

  return (
    <form onSubmit={doSubmit}>
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
      >
        <option value="">select...</option>
        <option value="bank">Bank</option>
        <option value="creditcard">Credit Card</option>
      </Input>

      <Collapse in={accountType.value !== ''}>
        <div>{accountTypeField}</div>
      </Collapse>

      <Button
        bsStyle="primary"
        type="submit"
        disabled={submitting}>
        {submitting ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
};

AddAccountForm.propTypes = {
  doSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default AddAccountForm;
