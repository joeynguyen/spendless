import PropTypes from 'prop-types';
import React from 'react';
import { Article, Box, Button, Heading, Section } from 'grommet';
import AddAccount from './AddAccount.jsx';
import AccountsList from './AccountsList.jsx';

const ManageAccounts = ({ accounts, actions }) => {
  const ccAccounts = accounts.filter(account => account.type === 'creditcard');
  const bankAccounts = accounts.filter(account => account.type === 'bank');
  return (
    <Article pad={{vertical: 'medium'}}>
      <Section pad="none" margin={{bottom: 'medium'}}>
        <Heading tag="h3">Manage Accounts</Heading>
        <hr />
        <AddAccount />
      </Section>
      <hr />
      <Section direction="row" margin={{bottom: 'medium'}}>
        <AccountsList accounts={accounts} />
        <Box size="small">
          <ul>
            <li>{bankAccounts.length} Bank accounts</li>
            <li>{ccAccounts.length} Credit card accounts</li>
          </ul>
        </Box>
      </Section>
      <hr />
      <Section align="end" pad="none" margin={{top: 'medium'}}>
        <Button
          name="close-manage-accounts"
          onClick={actions.toggleManageAccounts}
          label="Close"
        />
      </Section>
    </Article>
  );
};
ManageAccounts.propTypes = {
  accounts: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

export default ManageAccounts;
