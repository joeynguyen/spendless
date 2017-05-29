import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountDetails from './AccountDetails.jsx';

class AccountDetailsContainer extends Component {
  static propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.object),
    activeAccountId: PropTypes.string.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    // handle case where user deletes the account that the route is currently at
    // check to see if account still exists inside of list of accounts
    if (!nextProps.accounts.some(account => account._id === this.props.activeAccountId)) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <AccountDetails
        accounts={this.props.accounts}
        activeAccountId={this.props.activeAccountId}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    activeAccountId: state.activeAccountId,
  };
}

export default connect(mapStateToProps)(AccountDetailsContainer);
