import React, { PropTypes } from 'react';
import { Well } from 'react-bootstrap';

const AccountsList = ({ accounts }) => {
  return (
    <div>
    {
    accounts.map(function(account) {
      return (
        <Well bsSize="small" key={account._id}>
          <h4>{account.name}</h4>
          <p>{account.type === 'bank' ? 'Bank' : 'Credit Card'} - {account.company}</p>
        </Well>
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
