import React, { PropTypes } from 'react';
import { Modal, Button, Input } from 'react-bootstrap';

const EditTransaction = ({ editTransactionVisible, doToggleEditTransaction, doSelectActiveTransaction, fields }) => {
  const { date, description, category, amount } = fields;
  const handleCloseModal = function() {
    doToggleEditTransaction();
    doSelectActiveTransaction();
  };
  return (
    <Modal
      show={editTransactionVisible}
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
              addonBefore="$"
              label="Amount"
              {...amount}
            />
          </div>
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCloseModal}>Close</Button>
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
