import React from 'react';
import AccountsListItem from './AccountsListItem.jsx';

interface Props {
  accounts: Account[];
}

interface Account {
  _id: string;
  _rev: string;
  company: string;
  name: string;
  type: string;
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
