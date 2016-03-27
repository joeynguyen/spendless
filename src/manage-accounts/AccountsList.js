import React, { PropTypes } from 'react';
import AccountsListItem from './AccountsListItem.js';

const AccountsList = ({ accounts }) => {
  return (
    <div>
    {
      accounts.map(function(account) {
        return (
          <AccountsListItem account={account} key={account._id} />
        );
      })
    }
    </div>
  );
};
AccountsList.propTypes = {
  accounts: PropTypes.array.isRequired,
};

export default AccountsList;
