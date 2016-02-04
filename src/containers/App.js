import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sidebar from '../components/Sidebar';
import ManageAccountsWindow from '../components/ManageAccounts.js';
import { toggleManageAccounts } from '../manage-accounts/ManageAccountsActions.js';

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    showManageAccounts: PropTypes.bool,
    doToggleManageAccounts: PropTypes.func
  }
  close = () => {
    this.props.doToggleManageAccounts(false);
  }
  open = () => {
    this.props.doToggleManageAccounts(true);
  }
  render() {
    return (
      <div className="row">
        <Sidebar open={this.open} />
        {this.props.children}
        <ManageAccountsWindow showModal={this.props.showManageAccounts} close={this.close} />
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

function mapStateToProps(state) {
  return {
    showManageAccounts: state.showManageAccounts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doToggleManageAccounts: toggleManageAccounts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
