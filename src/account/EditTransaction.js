import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditTransaction = ({ activeTransaction, editTransactionVisible, doToggleEditTransaction }) => {
  console.log('activeTransaction', activeTransaction);
  return (
    <Modal
      show={editTransactionVisible}
      onHide={doToggleEditTransaction}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-xs-12">
            <p>Description: {activeTransaction.description}</p>
            <p>Date: {activeTransaction.transactionDate}</p>
            <p>Amount: {activeTransaction.amount}</p>
            <p>Category: {activeTransaction.category}</p>
          </div>
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={doToggleEditTransaction}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
EditTransaction.propTypes = {
  activeTransaction: PropTypes.object,
  editTransactionVisible: PropTypes.bool.isRequired,
  doToggleEditTransaction: PropTypes.func.isRequired,
};

export default EditTransaction;
