import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleUnsavedWarning } from './AccountsActions.js';
import { storeNextRoutePath } from '../app/AppActions.js';
import AccountPage from './AccountPage.jsx';

class AccountPageContainer extends Component {
  static propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.object),
    actions: PropTypes.object.isRequired,
    activeAccountId: PropTypes.string,
    manageTransactionVisible: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    // route: PropTypes.object.isRequired,
    uploadedTransactions: PropTypes.arrayOf(PropTypes.object),
    unsavedWarningVisible: PropTypes.bool.isRequired,
    nextRoutePath: PropTypes.string.isRequired
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    // set subscription to router leave event
    // this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
  }

  componentWillReceiveProps(nextProps) {
    // handle changing routes
    if (this.props.match.params.id !== nextProps.match.params.id) {

      // re-reset subscription to router leave event after route changed
      // this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
    }
  }

  shouldComponentUpdate(nextProps) {
    // handle case where user deletes the account that the route is currently at
    // check to see if account still exists inside of list of accounts
    // don't update because route will change to home page
    if (!nextProps.accounts.some(account => account._id === this.props.match.params.id)) {
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
    return true;
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
        accounts={this.props.accounts}
        activeAccountId={this.props.activeAccountId}
        manageTransactionVisible={this.props.manageTransactionVisible}
        unsavedWarningVisible={this.props.unsavedWarningVisible}
        uploadedTransactionsExist={this.props.uploadedTransactions.length > 0}
        localHandleAlertStay={this.handleAlertStay}
        localHandleAlertLeave={this.handleAlertLeave}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    activeAccountId: state.activeAccountId,
    manageTransactionVisible: state.manageTransactionVisible,
    unsavedWarningVisible: state.unsavedWarningVisible,
    uploadedTransactions: state.uploadedTransactions,
    nextRoutePath: state.nextRoutePath,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      toggleUnsavedWarning: toggleUnsavedWarning,
      storeNextRoutePath: storeNextRoutePath,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPageContainer);
