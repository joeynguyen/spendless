import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layer } from 'grommet';

import * as manageAccountsActions from './ManageAccountsActions.js';
import ManageAccounts from './ManageAccounts.jsx';

export class ManageAccountsContainer extends Component {
  static propTypes = {
    accounts: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    manageAccountsVisible: PropTypes.bool.isRequired,
  }
  render() {
    if (this.props.manageAccountsVisible) {
      // Using Layer in container component to make debugging
      // ManageAccounts component using React Dev Tools easier
      return (
        <Layer closer onClose={this.props.actions.toggleManageAccounts}>
          <ManageAccounts
            accounts={this.props.accounts}
            actions={this.props.actions}
          />
        </Layer>
      );
    }

    return null;
  }
}

function mapStateToProps(state) {
  return {
    manageAccountsVisible: state.manageAccountsVisible,
    accounts: state.accounts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(manageAccountsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccountsContainer);
