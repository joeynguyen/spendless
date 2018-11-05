import React from 'react';
import AccountsListItem, { Account } from './AccountsListItem';

type Props = {
  accounts: Account[];
}

const AccountsList = (props: Props) => {
  const accounts: Account[] = props.accounts;
  return (
    <>
      {accounts.map(function(account: Account) {
        return <AccountsListItem account={account} key={account._id} />;
      })}
    </>
  );
};

export default AccountsList;
