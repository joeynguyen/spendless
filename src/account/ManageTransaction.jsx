import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

import FieldGroup from '../custom-components/FieldGroup.jsx';

const ManageTransaction = ({ manageType = 'add', fields, toggleManageTransaction, pristine = true, doSubmit }) => {
  const { date, description, category, amount, notes } = fields;
  const componentTitle = (manageType === 'edit') ? 'Edit Transaction' : 'Add Transaction';

  return (
    <form onSubmit={doSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>{ componentTitle }</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col-xs-12">
            <FieldGroup
              type="text"
              label="Description"
              name={description.name}
              error={description.error}
              invalid={description.invalid}
              touched={description.touched}
              onBlur={description.onBlur}
              onChange={description.onChange}
              onFocus={description.onFocus}
              value={description.value}
            />
            <FieldGroup
              type="date"
              label="Date"
              name={date.name}
              error={date.error}
              invalid={date.invalid}
              touched={date.touched}
              onBlur={date.onBlur}
              onChange={date.onChange}
              onFocus={date.onFocus}
              value={date.value}
            />
            <FieldGroup
              type="text"
              label="Category"
              name={category.name}
              error={category.error}
              invalid={category.invalid}
              touched={category.touched}
              onBlur={category.onBlur}
              onChange={category.onChange}
              onFocus={category.onFocus}
              value={category.value}
            />
            <FieldGroup
              type="text"
              addonBefore="$"
              label="Amount"
              name={amount.name}
              error={amount.error}
              invalid={amount.invalid}
              touched={amount.touched}
              onBlur={amount.onBlur}
              onChange={amount.onChange}
              onFocus={amount.onFocus}
              value={amount.value}
            />
            <FieldGroup
              componentClass="textarea"
              label="Notes"
              placeholder="Add notes for this transaction"
              name={notes.name}
              error={notes.error}
              invalid={notes.invalid}
              touched={notes.touched}
              onBlur={notes.onBlur}
              onChange={notes.onChange}
              onFocus={notes.onFocus}
              value={notes.value}
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div className="form-group">
          <Button
            bsStyle="primary"
            type="submit"
            disabled={pristine}
          >Save</Button>
          {' '}
          <Button id="cancel-manage-transaction" onClick={toggleManageTransaction}>Cancel</Button>
        </div>
      </Modal.Footer>
    </form>
  );
};
ManageTransaction.propTypes = {
  manageType: PropTypes.string.isRequired,
  toggleManageTransaction: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  doSubmit: PropTypes.func.isRequired,
};

export default ManageTransaction;
