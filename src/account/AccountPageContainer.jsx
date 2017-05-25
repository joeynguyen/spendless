import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { resetCheckedTransactions } from './TransactionsActions.js';
import { toggleUnsavedWarning } from './AccountsActions.js';
import { storeNextRoutePath } from '../app/AppActions.js';
import AccountPage from './AccountPage.jsx';

class AccountPageContainer extends Component {
  static propTypes = {
    accounts: PropTypes.arrayOf(React.PropTypes.object),
    actions: PropTypes.object.isRequired,
    manageTransactionVisible: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    uploadedTransactions: PropTypes.arrayOf(React.PropTypes.object),
    unsavedWarningVisible: PropTypes.bool.isRequired,
    nextRoutePath: PropTypes.string.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentDidMount() {
    // set subscription to router leave event
    this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
  }

  componentWillReceiveProps(nextProps) {
    // handle changing routes
    if (this.props.params.id !== nextProps.params.id) {
      // remove transactions from ManageTransactionsList redux-form
      this.props.actions.resetCheckedTransactions();

      // re-reset subscription to router leave event after route changed
      this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
    }
  }

  shouldComponentUpdate(nextProps) {
    // handle case where user deletes the account that the route is currently at
    // check to see if account still exists inside of list of accounts
    // don't update because route will change to home page
    if (!nextProps.accounts.some(account => account._id === this.props.params.id)) {
      return false;
    }
    return true;
  }

  routerWillLeave = (nextLocation) => {
    if (this.props.uploadedTransactions.length > 0 && this.props.nextRoutePath === '') {
      // need to check for nextRoutePath as empty string or else this will run again when
      // handleAlertLeave() is called and returns false for changing routes with
      // this.context.router.push(this.props.nextRoutePath);
      this.props.actions.toggleUnsavedWarning();
      // store nextRoutePath for use with this.context.router.push later
      this.props.actions.storeNextRoutePath(nextLocation.pathname + nextLocation.search);
      // return false to prevent a transition
      return false;
    }
  }

  handleAlertStay = () => {
    this.props.actions.toggleUnsavedWarning();
    // reset nextRoutePath prop
    this.props.actions.storeNextRoutePath('');
  }

  handleAlertLeave = () => {
    this.props.actions.toggleUnsavedWarning();
    this.context.router.push(this.props.nextRoutePath);
    // reset nextRoutePath prop
    this.props.actions.storeNextRoutePath('');
  }

  render() {
    return (
      <AccountPage
        manageTransactionVisible={this.props.manageTransactionVisible}
        unsavedWarningVisible={this.props.unsavedWarningVisible}
        localHandleAlertStay={this.handleAlertStay}
        localHandleAlertLeave={this.handleAlertLeave}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    manageTransactionVisible: state.manageTransactionVisible,
    unsavedWarningVisible: state.unsavedWarningVisible,
    uploadedTransactions: state.uploadedTransactions,
    nextRoutePath: state.nextRoutePath,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      resetCheckedTransactions: resetCheckedTransactions,
      toggleUnsavedWarning: toggleUnsavedWarning,
      storeNextRoutePath: storeNextRoutePath,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPageContainer);
