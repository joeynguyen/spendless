import React, { PropTypes } from 'react';

const TransactionsItem = ({ item }) => {
  return (
    <tr>
      <td>{item.transactionDate}</td>
      <td>{item.description}</td>
      <td>{item.category}</td>
      <td>{item.amount}</td>
    </tr>
  );
};
TransactionsItem.propTypes = { item: PropTypes.object.isRequired };

export default TransactionsItem;
