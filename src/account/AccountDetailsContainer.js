import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AccountDetails from './AccountDetail.js';

class AccountDetailsContainer extends Component {
  static propTypes = {
    accounts: PropTypes.arrayOf(React.PropTypes.object),
    params: PropTypes.object.isRequired,
  }

  render() {
    return (
      <AccountDetails
        accounts={this.props.accounts}
        params={this.props.params}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
  };
}

export default connect(mapStateToProps)(AccountDetailsContainer);
