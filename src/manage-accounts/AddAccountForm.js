import React, { PropTypes } from 'react';
import { ButtonInput, Collapse, Input, Alert } from 'react-bootstrap';

const AddAccountForm = ({ hideAlert, alertVisible, doSubmit, fields, submitting }) => {
  // handleSubmit and fields are from redux-form
  // const accountName = this.props.fields.accountName;
  const { accountName, accountType, accountCompany } = fields;
  let alertMessage;
  if (alertVisible) {
    alertMessage = (
      <div>
        <br />
        <Alert bsStyle="success" onDismiss={hideAlert} dismissAfter={2000}>
          <span>Account added!</span>
        </Alert>
      </div>
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
      { alertMessage }
    </form>
  );
};

AddAccountForm.propTypes = {
  hideAlert: PropTypes.func.isRequired,
  alertVisible: PropTypes.bool.isRequired,
  doSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default AddAccountForm;