import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AccountDetails from './AccountDetail.js';

class AccountDetailsContainer extends Component {
  static propTypes = {
    accounts: PropTypes.arrayOf(React.PropTypes.object),
    activeAccountId: PropTypes.string.isRequired,
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
