import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TransactionsItem from './TransactionsItem.js';
import { toggleEditTransaction, selectActiveTransaction } from './TransactionsActions.js';

class TransactionsItemContainer extends Component {
  static propTypes = {
    transaction: PropTypes.object.isRequired,
    unsaved: PropTypes.bool.isRequired,
    doToggleEditTransaction: PropTypes.func.isRequired,
    doSelectActiveTransaction: PropTypes.func.isRequired,
  }
  render() {
    return (
      <TransactionsItem
        transaction={this.props.transaction}
        unsaved={this.props.unsaved}
        doToggleEditTransaction={this.props.doToggleEditTransaction}
        doSelectActiveTransaction={this.props.doSelectActiveTransaction}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doToggleEditTransaction: toggleEditTransaction,
    doSelectActiveTransaction: selectActiveTransaction,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(TransactionsItemContainer);
