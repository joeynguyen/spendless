import PropTypes from 'prop-types';
import React from 'react';
import { Animate, Button } from 'grommet';

import FieldGroup from '../custom-components/FieldGroup.jsx';
import { accountCompanyOptions, accountTypeOptions } from '../constants.js';

const AddAccountForm = ({ localHandleSubmit, fields, submitting }) => {
  // fields and submitting are from redux-form
  const { accountName, accountType, accountCompany } = fields;
  let accountTypeField = '';
  if (accountType.value === 'bank') {
    accountTypeField = (
      <FieldGroup
        type="text"
        placeholder="Enter the name of the financial institution"
        label="Name of Institution"
        name={accountCompany.name}
        error={accountCompany.error}
        invalid={accountCompany.invalid}
        touched={accountCompany.touched}
        onBlur={accountCompany.onBlur}
        onChange={accountCompany.onChange}
        onFocus={accountCompany.onFocus}
        value={accountCompany.value}
      />
    );
  } else if (accountType.value === 'creditcard') {
    accountTypeField = (
      <FieldGroup
        componentClass="select"
        label="Credit Card Company"
        options={accountCompanyOptions}
        name={accountCompany.name}
        error={accountCompany.error}
        invalid={accountCompany.invalid}
        touched={accountCompany.touched}
        onBlur={accountCompany.onBlur}
        onChange={accountCompany.onChange}
        onFocus={accountCompany.onFocus}
        value={accountCompany.value}
      />
    );
  }

  return (
    <form id="add-account-form" onSubmit={localHandleSubmit}>
      <FieldGroup
        type="text"
        placeholder="Enter a name for the account"
        label="Name"
        name={accountName.name}
        error={accountName.error}
        invalid={accountName.invalid}
        touched={accountName.touched}
        onBlur={accountName.onBlur}
        onChange={accountName.onChange}
        onFocus={accountName.onFocus}
        value={accountName.value}
      />

      <FieldGroup
        componentClass="select"
        label="Type"
        options={accountTypeOptions}
        name={accountType.name}
        error={accountType.error}
        invalid={accountType.invalid}
        touched={accountType.touched}
        onBlur={accountType.onBlur}
        onChange={accountType.onChange}
        onFocus={accountType.onFocus}
        value={accountType.value}
      />

      <Animate
        visible={accountType.value !== ''}
        enter={{animation: 'slide-down', duration: 300, delay: 0}}
      >
        {accountTypeField}
      </Animate>

      <Button
        name="add-account"
        type="submit"
        accent
        label={submitting ? 'Saving...' : 'Save'}
        disabled={submitting}
      />
    </form>
  );
};

AddAccountForm.propTypes = {
  localHandleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default AddAccountForm;
