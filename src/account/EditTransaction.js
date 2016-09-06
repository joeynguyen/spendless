import React, { PropTypes } from 'react';
import { Modal, Button, Input } from 'react-bootstrap';

const EditTransaction = ({ toggleEditTransaction, pristine, doSubmit, fields }) => {
  const { date, description, category, amount, notes } = fields;

  return (
    <form onSubmit={doSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Transaction</Modal.Title>
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
            type="submit"
            disabled={pristine}
            bsStyle="primary"
          >Update</Button>
          {' '}
          <Button onClick={toggleEditTransaction}>Cancel</Button>
        </div>
      </Modal.Footer>
    </form>
  );
};
EditTransaction.propTypes = {
  toggleEditTransaction: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  doSubmit: PropTypes.func.isRequired,
};

export default EditTransaction;
