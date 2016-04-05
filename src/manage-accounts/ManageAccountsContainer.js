import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleManageAccounts } from './ManageAccountsActions.js';
import ManageAccounts from './ManageAccounts.js';

class ManageAccountsContainer extends Component {
  static propTypes = {
    manageAccountsVisible: PropTypes.bool.isRequired,
    doToggleManageAccounts: PropTypes.func.isRequired,
    accounts: PropTypes.array.isRequired,
  }
  render() {
    return (
      <ManageAccounts {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    manageAccountsVisible: state.manageAccountsVisible,
    accounts: state.accounts,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doToggleManageAccounts: toggleManageAccounts,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccountsContainer);
