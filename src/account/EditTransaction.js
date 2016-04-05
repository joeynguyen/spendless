import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditTransaction = ({ editTransactionVisible, doToggleEditTransaction }) => {
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
  editTransactionVisible: PropTypes.bool.isRequired,
  doToggleEditTransaction: PropTypes.func.isRequired,
};

export default EditTransaction;
