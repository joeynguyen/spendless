import PropTypes from 'prop-types';
import React from 'react';
import { Box } from 'grommet';

import AccountsListItem from './AccountsListItem.jsx';

const AccountsList = ({ accounts }) => {
  return (
    <Box size="medium" pad={{between: 'medium'}}>
    {
      accounts.map(function(account) {
        return (
            <AccountsListItem account={account} key={account._id} />
        );
      })
    }
    </Box>
  );
};
AccountsList.propTypes = {
  accounts: PropTypes.array.isRequired,
};

export default AccountsList;
