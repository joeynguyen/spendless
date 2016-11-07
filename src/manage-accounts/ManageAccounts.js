import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddAccount from './AddAccount.js';
import AccountsList from './AccountsList.js';

const ManageAccounts = ({ accounts, actions, manageAccountsVisible }) => {
  const ccAccounts = accounts.filter(account => account.type === 'creditcard');
  const bankAccounts = accounts.filter(account => account.type === 'bank');
  return (
    <Modal
      show={manageAccountsVisible}
      onHide={actions.toggleManageAccounts}
    >
      <Modal.Header closeButton>
        <Modal.Title>Manage Accounts</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-xs-8">
            <AddAccount />
            <hr />
            <AccountsList accounts={accounts} />
          </div>

          <div className="col-xs-4">
            <ul>
              <li>{bankAccounts.length} Bank accounts</li>
              <li>{ccAccounts.length} Credit card accounts</li>
            </ul>
          </div>
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={actions.toggleManageAccounts}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
ManageAccounts.propTypes = {
  accounts: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  manageAccountsVisible: PropTypes.bool.isRequired,
};

export default ManageAccounts;
