import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddAccountContainer from './AddAccountContainer.js';
import AccountsList from './AccountsList.js';

const ManageAccounts = ({ manageAccountsVisible, doToggleManageAccounts, accounts }) => {
  const ccAccounts = accounts.filter(account => account.type === 'creditcard');
  const bankAccounts = accounts.filter(account => account.type === 'bank');
  return (
    <Modal
      show={manageAccountsVisible}
      onHide={doToggleManageAccounts}
    >
      <Modal.Header closeButton>
        <Modal.Title>Manage Accounts</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-xs-8">
            <AddAccountContainer />
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
        <Button onClick={doToggleManageAccounts}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
ManageAccounts.propTypes = {
  manageAccountsVisible: PropTypes.bool.isRequired,
  doToggleManageAccounts: PropTypes.func.isRequired,
  accounts: PropTypes.array.isRequired,
};

export default ManageAccounts;
