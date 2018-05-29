import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AccountsGroup from './AccountsGroup.jsx';
import * as accountsActions from './AccountsActions.js';

class AccountContainer extends Component {
  static propTypes = {
    accounts: PropTypes.array,
    actions: PropTypes.object.isRequired,
    activeAccountId: PropTypes.string,
  };

  componentWillMount() {
    this.props.actions.getAccounts();
  }

  render() {
    return (
      <AccountsGroup
        accounts={this.props.accounts}
        activeAccountId={this.props.activeAccountId}
      />
    );
  }
}

// Anything returned from this function will end up as props
// on the AccountContainer container
function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    activeAccountId: state.activeAccountId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(accountsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
