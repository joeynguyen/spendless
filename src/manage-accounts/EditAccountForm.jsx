import PropTypes from 'prop-types';
import React from 'react';
import { Animate, Box, Button, Form } from 'grommet';

import ConnectedTextInput from '../custom-components/ConnectedTextInput.jsx';
import ConnectedSelect from '../custom-components/ConnectedSelect.jsx';
import { accountCompanyOptions, accountTypeOptions } from '../constants.js';

const EditAccountForm = ({ fields, pristine, toggleSettings, toggleConfirmDelete, confirmDeleteVisible, handleUpdateAccount }) => {
  const { accountName, accountType, accountCompany } = fields;
  return (
    <Form id="update-account-form" onSubmit={handleUpdateAccount} pad={{vertical: 'small'}}>
      <ConnectedTextInput
        id={accountName.name}
        placeholder="Enter the name of the financial institution"
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
      <ConnectedSelect
        id={accountType.name}
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
        enter={{animation: 'fade', duration: 300, delay: 0}}
        visible={accountType.value === 'bank'}
      >
        <ConnectedTextInput
          id={accountCompany.name}
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
      </Animate>
      <Animate
        enter={{animation: 'fade', duration: 300, delay: 0}}
        visible={accountType.value === 'creditcard'}
      >
        <ConnectedSelect
          id={accountCompany.name}
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
      </Animate>
      <Box direction="row" justify="between" pad={{vertical: 'small'}}>
        <Button
          name="update"
          type="submit"
          accent
          label="Update"
          disabled={pristine}
        />
        {' '}
        <Button
          name="cancel"
          type="button"
          label="Cancel"
          onClick={toggleSettings}
        />
      </Box>
      <Box size="small" alignSelf="center">
        <Button
          name="delete-toggle"
          type="button"
          critical
          label="Delete"
          disabled={confirmDeleteVisible}
          onClick={toggleConfirmDelete}
          fill={false}
        />
      </Box>
    </Form>
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
