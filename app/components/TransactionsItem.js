import React, { Component, PropTypes } from 'react';

export default class TransactionsItem extends Component {
  static propTypes = {
    item: PropTypes.object
  }
  render() {
    return (
      <tr>
        <td>{this.props.item.transactionDate}</td>
        <td>{this.props.item.description}</td>
        <td>{this.props.item.category}</td>
        <td>{this.props.item.amount}</td>
      </tr>
    );
  }
}
