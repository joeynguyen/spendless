import React, { PropTypes } from 'react';
import AccountsListItem from './AccountsListItem.js';

const AccountsList = ({ accounts }) => {
  return (
    <div>
    {
      accounts.map(function(account) {
        const formInitialValues = {
          initialValues: {
            accountName: account.name,
            accountType: account.type,
            accountCompany: account.company,
          }
        };
        return (
          <AccountsListItem {...formInitialValues} account={account} key={account._id} formKey={account._id} />
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
