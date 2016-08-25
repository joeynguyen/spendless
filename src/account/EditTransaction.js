import React, { PropTypes } from 'react';
import { Modal, Button, Input } from 'react-bootstrap';

const EditTransaction = (props) => {
  const {
    editTransactionVisible,
    toggleEditTransaction,
    pristine,
    doSubmit,
  } = props;
  const { date, description, category, amount, notes } = props.fields;
  const handleCloseModal = function() {
    // reset current transaction being edited to null
    toggleEditTransaction();
  };

  return (
    <Modal
      show={editTransactionVisible}
      backdrop="static"
      onHide={handleCloseModal}
    >
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
                type="number"
                step="0.01"
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
            <Button onClick={handleCloseModal}>Cancel</Button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
EditTransaction.propTypes = {
  editTransactionVisible: PropTypes.bool.isRequired,
  toggleEditTransaction: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
};

export default EditTransaction;
