import React, { Component, PropTypes } from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import TransactionsItem from './TransactionsItem.js';

class TransactionsItemContainer extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    unsaved: PropTypes.bool.isRequired,
  }
  render() {
    return (
      <TransactionsItem {...this.props} />
    );
  }
}

export default TransactionsItemContainer;
