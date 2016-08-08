import React, { PropTypes } from 'react';
import { Modal, Button, Input } from 'react-bootstrap';

const EditTransaction = (props) => {
  const {
    editTransactionVisible,
    doToggleEditTransaction,
    doSelectActiveTransaction,
    pristine,
    handleUpdateTransaction,
  } = props;
  const { date, description, category, amount, notes } = props.fields;
  const handleCloseModal = function() {
    doToggleEditTransaction();
    // reset current transaction being edited to null
    doSelectActiveTransaction();
  };

  return (
    <Modal
      show={editTransactionVisible}
      backdrop="static"
      onHide={handleCloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-xs-12">
            <Input
              type="text"
              label="Description"
              {...description}
            />
            <Input
              type="date"
              label="Date"
              {...date}
            />
            <Input
              type="text"
              label="Category"
              {...category}
            />
            <Input
              type="number"
              step="0.01"
              addonBefore="$"
              label="Amount"
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
            disabled={pristine}
            onClick={handleUpdateTransaction}
            bsStyle="primary"
          >Update</Button>
          {' '}
          <Button onClick={handleCloseModal}>Cancel</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
EditTransaction.propTypes = {
  editTransactionVisible: PropTypes.bool.isRequired,
  doToggleEditTransaction: PropTypes.func.isRequired,
  doSelectActiveTransaction: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
};

export default EditTransaction;
