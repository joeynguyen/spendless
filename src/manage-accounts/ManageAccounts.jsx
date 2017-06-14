import PropTypes from 'prop-types';
import React from 'react';
import { Article, Box, Button, Heading, Layer, Section } from 'grommet';
import AddAccount from './AddAccount.jsx';
import AccountsList from './AccountsList.jsx';

const ManageAccounts = ({ accounts, actions, manageAccountsVisible }) => {
  const ccAccounts = accounts.filter(account => account.type === 'creditcard');
  const bankAccounts = accounts.filter(account => account.type === 'bank');
  let modal = null;
  if (manageAccountsVisible) {
    modal = (
      <Layer closer onClose={actions.toggleManageAccounts}>
        <Article>
          <Section pad={{vertical: 'medium'}}>
            <Heading tag="h3">Manage Accounts</Heading>
            <hr />
            <AddAccount />
          </Section>
          <Section direction="row" pad={{vertical: 'small'}}>
            <Box size="medium">
              <AccountsList accounts={accounts} />
            </Box>
            <Box size="small">
              <ul>
                <li>{bankAccounts.length} Bank accounts</li>
                <li>{ccAccounts.length} Credit card accounts</li>
              </ul>
            </Box>
          </Section>
          <hr />
          <Section align="end" pad={{vertical: 'medium'}}>
            <Button
              name="close-manage-accounts"
              onClick={actions.toggleManageAccounts}
              label="Close"
            />
          </Section>
        </Article>
      </Layer>
    );
  }

  return modal;
};
ManageAccounts.propTypes = {
  accounts: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  manageAccountsVisible: PropTypes.bool.isRequired,
};

export default ManageAccounts;
