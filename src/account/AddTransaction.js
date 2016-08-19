import React, { PropTypes } from 'react';
import { Modal, Button, Input } from 'react-bootstrap';

const AddTransaction = (props) => {
  const { addTransactionVisible, toggleAddTransaction, pristine, doSubmit } = props;
  const { date, description, category, amount, notes } = props.fields;

  return (
    <Modal
      show={addTransactionVisible}
      backdrop="static"
      onHide={toggleAddTransaction}
    >
      <form onSubmit={doSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
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
              bsStyle="primary"
              type="submit"
              disabled={pristine}
            >Save</Button>
            {' '}
            <Button onClick={toggleAddTransaction}>Cancel</Button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
AddTransaction.propTypes = {
  addTransactionVisible: PropTypes.bool.isRequired,
  toggleAddTransaction: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  doSubmit: PropTypes.func.isRequired,
};

export default AddTransaction;
