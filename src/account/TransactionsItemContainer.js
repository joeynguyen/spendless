import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TransactionsItem from './TransactionsItem.js';
import { toggleEditTransaction } from './TransactionsActions.js';

class TransactionsItemContainer extends Component {
  static propTypes = {
    transaction: PropTypes.object.isRequired,
    unsaved: PropTypes.bool.isRequired,
    doToggleEditTransaction: PropTypes.func.isRequired,
  }
  render() {
    return (
      <TransactionsItem {...this.props} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doToggleEditTransaction: toggleEditTransaction,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(TransactionsItemContainer);
