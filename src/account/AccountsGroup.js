import React, { PropTypes } from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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
            return (
              <LinkContainer to={`account/${account._id}`} key={account._id} active={account._id === activeAccountId}>
                <ListGroupItem>{account.name}</ListGroupItem>
              </LinkContainer>
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
