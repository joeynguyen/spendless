import PropTypes from 'prop-types';
import React from 'react';
import { Accordion, AccordionPanel, Anchor, Box, CreditCardIcon, Heading, MoneyIcon, List, ListItem } from 'grommet';

const AccountsGroup = ({ accounts, activeAccountId }) => {
  const bankAccounts = accounts.filter(account => account.type === 'bank');
  const ccAccounts = accounts.filter(account => account.type === 'creditcard');
  const bankHeader = (
    <Box direction="row" align="center">
      <MoneyIcon />
      <Box pad={{horizontal: 'small'}}>
        <Heading tag="h4" margin="none">Banks</Heading>
      </Box>
    </Box>
  );
  const ccHeader = (
    <Box direction="row" align="center">
      <CreditCardIcon />
      <Box pad={{horizontal: 'small'}}>
        <Heading tag="h4" margin="none">Credit Cards</Heading>
      </Box>
    </Box>
  );
  return (
    <Accordion openMulti active={[0, 1]}>
      <AccordionPanel heading={bankHeader}>
        <List>
          {
            bankAccounts.map((account, i) => {
              // const isActive = account._id === activeAccountId;
              // disable clicking on currently displayed account in sidebar so that user
              // can't change routes to the same route which resets uploadedTransactions state
              return (
                <ListItem key={`bank${i}`}><Anchor path={`/account/${account._id}`} key={account._id}>{account.name}</Anchor></ListItem>
              );
            })
          }
        </List>
      </AccordionPanel>
      <AccordionPanel heading={ccHeader}>
        <List>
          {
            ccAccounts.map((account, i) => {
              // const isActive = account._id === activeAccountId;
              // disable clicking on currently displayed account in sidebar so that user
              // can't change routes to the same route which resets uploadedTransactions state
              return (
                <ListItem key={`cc${i}`}><Anchor path={`/account/${account._id}`} key={account._id}>{account.name}</Anchor></ListItem>
              );
            })
          }
        </List>
      </AccordionPanel>
    </Accordion>
  );
};
AccountsGroup.propTypes = {
  accounts: PropTypes.array.isRequired,
  activeAccountId: PropTypes.string,
};

export default AccountsGroup;
