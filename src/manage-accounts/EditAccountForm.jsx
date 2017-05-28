import React, { PropTypes } from 'react';
import { Collapse, Button } from 'react-bootstrap';

import FieldGroup from '../custom-components/FieldGroup.jsx';
import { accountCompanyOptions, accountTypeOptions } from '../constants.js';

const EditAccountForm = ({ fields, pristine, toggleSettings, toggleConfirmDelete, confirmDeleteVisible, handleUpdateAccount }) => {
  const { accountName, accountType, accountCompany } = fields;
  return (
    <form id="update-account-form" onSubmit={handleUpdateAccount}>
      <FieldGroup
        type="text"
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
      <Collapse in={accountType.value === 'bank'}>
        <div>
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
        </div>
      </Collapse>
      <Collapse in={accountType.value === 'creditcard'}>
        <div>
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
        </div>
      </Collapse>
      <div className="form-group">
        <Button
          name="update"
          type="submit"
          disabled={pristine}
          bsStyle="primary"
        >Update</Button>
        {' '}
        <Button
          name="cancel"
          onClick={toggleSettings}
        >Cancel</Button>
        <Button
          name="delete-toggle"
          className="pull-right"
          disabled={confirmDeleteVisible}
          onClick={toggleConfirmDelete}
          bsStyle="danger"
        >Delete</Button>
      </div>
    </form>
  );
};
EditAccountForm.propTypes = {
  fields: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  toggleSettings: PropTypes.func.isRequired,
  toggleConfirmDelete: PropTypes.func.isRequired,
  confirmDeleteVisible: PropTypes.bool.isRequired,
  handleUpdateAccount: PropTypes.func.isRequired,
};

export default EditAccountForm;
