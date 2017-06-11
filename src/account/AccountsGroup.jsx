import PropTypes from 'prop-types';
import React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const AccountsGroup = ({ title, icon, accounts, activeAccountId }) => {
  const panelHeader = (
    <div>
      <i className={'fa fa-lg fa-fw fa-' + icon }></i>
      {` ${title}`}
    </div>
  );
  return (
    <Panel collapsible defaultExpanded header={panelHeader}>
      <ListGroup fill>
        {
          accounts.map(function(account) {
            const isActive = account._id === activeAccountId;
            // disable clicking on currently displayed account in sidebar so that user
            // can't change routes to the same route which resets uploadedTransactions state
            return (
              <Link to={`/account/${account._id}`} key={account._id}>
                <ListGroupItem disabled={isActive}>{account.name}</ListGroupItem>
              </Link>
            );
          })
        }
      </ListGroup>
    </Panel>
  );
};
AccountsGroup.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  accounts: PropTypes.array.isRequired,
  activeAccountId: PropTypes.string,
};

export default AccountsGroup;
