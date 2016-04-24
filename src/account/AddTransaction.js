import React, { PropTypes } from 'react';
import { Modal, Button, Input, Alert } from 'react-bootstrap';

const AddTransaction = (props) => {
  const {
    addTransactionVisible,
    doToggleAddTransaction,
    pristine,
    alertVisible,
    handleSaveTransaction,
  } = props;
  const { date, description, category, amount, notes } = props.fields;
  const handleCloseModal = function() {
    doToggleAddTransaction();
  };
  let alertMessage;

  if (alertVisible) {
    alertMessage = (
      <Alert bsStyle="success" onDismiss={handleCloseModal} dismissAfter={2000}>
        <p>Transaction added successfully!</p>
      </Alert>
    );
  }
  return (
    <Modal
      show={addTransactionVisible}
      onHide={handleCloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Transaction</Modal.Title>
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
            onClick={handleSaveTransaction}
            bsStyle="primary"
          >Save</Button>
          {' '}
          <Button onClick={handleCloseModal}>Cancel</Button>
        </div>
        { alertMessage }
      </Modal.Footer>
    </Modal>
  );
};
AddTransaction.propTypes = {
  addTransactionVisible: PropTypes.bool.isRequired,
  doToggleAddTransaction: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
};

export default AddTransaction;
