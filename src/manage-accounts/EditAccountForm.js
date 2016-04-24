import React, { PropTypes } from 'react';
import { Collapse, Input, Button } from 'react-bootstrap';

const EditAccountForm = ({ fields, pristine, toggleSettings, toggleConfirmDelete, confirmDeleteVisible, handleUpdateAccount }) => {
  const { accountName, accountType, accountCompany } = fields;
  return (
    <form>
      <Input
        type="text"
        label="Name"
        {...accountName}
      />
      <Input
        type="select"
        label="Type"
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
            {...accountCompany}
          />
        </div>
      </Collapse>
      <Collapse in={accountType.value === 'creditcard'}>
        <div>
          <Input
            type="select"
            label="Credit Card Company"
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
        </div>
      </Collapse>
      <div className="form-group">
        <Button
          disabled={pristine}
          onClick={handleUpdateAccount}
          bsStyle="primary"
        >Update</Button>
        {' '}
        <Button
          onClick={toggleSettings}
        >Cancel</Button>
        <Button
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
