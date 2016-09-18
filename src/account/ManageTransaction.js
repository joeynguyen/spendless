import React, { PropTypes } from 'react';
import { Modal, Button, Input } from 'react-bootstrap';

const ManageTransaction = ({ manageType = 'add', fields, toggleManageTransaction, pristine = true, doSubmit }) => {
  const { date, description, category, amount, notes } = fields;
  let componentTitle = 'Add Transaction';
  if (manageType === 'edit') {
    componentTitle = 'Edit Transaction';
  }

  return (
    <form onSubmit={doSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>{ componentTitle }</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col-xs-12">
            <Input
              type="text"
              label="Description"
              bsStyle={description.touched && description.invalid ? 'error' : null}
              help={description.touched ? description.error : ''}
              {...description}
            />
            <Input
              type="date"
              label="Date"
              bsStyle={date.touched && date.invalid ? 'error' : null}
              help={date.touched ? date.error : ''}
              {...date}
            />
            <Input
              type="text"
              label="Category"
              bsStyle={category.touched && category.invalid ? 'error' : null}
              help={category.touched ? category.error : ''}
              {...category}
            />
            <Input
              type="text"
              addonBefore="$"
              label="Amount"
              bsStyle={amount.touched && amount.invalid ? 'error' : null}
              help={amount.touched ? amount.error : ''}
              {...amount}
            />
            <Input
              type="textarea"
              label="Notes"
              placeholder="Add notes for this transaction"
              {...notes}
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
