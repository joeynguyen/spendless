import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sidebar from '../components/Sidebar';
import ManageAccountsWindow from '../components/ManageAccounts.js';
import { toggleManageAccounts } from '../manage-accounts/ManageAccountsActions.js';

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    doToggleManageAccounts: PropTypes.func.isRequired
  }
  open = () => {
    this.props.doToggleManageAccounts(true);
  }
  render() {
    return (
      <div className="row">
        <Sidebar open={this.open} />
        {this.props.children}
        <ManageAccountsWindow />
        {
        /*
          (() => {
            if (process.env.NODE_ENV !== 'production') {
              const DevTools = require('./DevTools');
              return <DevTools />;
            }
          })()
        */
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doToggleManageAccounts: toggleManageAccounts }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
