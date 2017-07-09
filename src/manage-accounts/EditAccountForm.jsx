import PropTypes from 'prop-types';
import React from 'react';
import { Collapse } from 'react-collapse';
import { Button } from 'antd';

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
      <Collapse isOpened={accountType.value === 'bank'} fixedHeight={72}>
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
      <Collapse isOpened={accountType.value === 'creditcard'} fixedHeight={72}>
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
      <div>
        <Button
          name="update"
          disabled={pristine}
          htmlType="submit"
          size="large"
          type="primary"
        >Update</Button>
        <Button
          name="cancel"
          onClick={toggleSettings}
          size="large"
        >Cancel</Button>
        <Button
          name="delete-toggle"
          disabled={confirmDeleteVisible}
          onClick={toggleConfirmDelete}
          size="large"
          type="danger"
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
