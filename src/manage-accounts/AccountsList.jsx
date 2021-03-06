import PropTypes from 'prop-types';
import React from 'react';
import AccountsListItem from './AccountsListItem.jsx';

const AccountsList = ({ accounts }) => {
  return (
    <>
      {accounts.map(function(account) {
        return <AccountsListItem account={account} key={account._id} />;
      })}
    </>
  );
};
AccountsList.propTypes = {
  accounts: PropTypes.array.isRequired,
};

export default AccountsList;
