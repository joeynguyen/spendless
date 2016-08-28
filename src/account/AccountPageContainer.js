import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { resetUploadedTransactions, resetCurrentTransactions } from './TransactionsActions.js';
import { toggleUnsavedWarning } from './AccountsActions.js';
import { storeNextRoutePath } from '../app/AppActions.js';
import AccountDetailsContainer from './AccountDetailsContainer.js';
import TransactionsListContainer from './TransactionsListContainer.js';
import EditTransactionContainer from './EditTransactionContainer.js';
import AddTransactionContainer from './AddTransactionContainer.js';
import UnsavedWarning from './UnsavedWarning.js';

class AccountPageContainer extends Component {
  static propTypes = {
    accounts: PropTypes.arrayOf(React.PropTypes.object),
    addTransactionVisible: PropTypes.bool.isRequired,
    editTransactionVisible: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    uploadedTransactions: PropTypes.arrayOf(React.PropTypes.object),
    doResetUploadedTransactions: PropTypes.func.isRequired,
    doResetCurrentTransactions: PropTypes.func.isRequired,
    doToggleUnsavedWarning: PropTypes.func.isRequired,
    unsavedWarningVisible: PropTypes.bool.isRequired,
    doStoreNextRoutePath: PropTypes.func.isRequired,
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
      this.props.doResetCurrentTransactions();

      // re-reset subscription to router leave event after route changed
      this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
    }
  }

  shouldComponentUpdate(nextProps) {
    // handle case where user deletes the account that the route is currently at
    // check to see if account still exists inside of list of accounts
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
      this.props.doToggleUnsavedWarning();
      // store nextRoutePath for use with this.context.router.push later
      this.props.doStoreNextRoutePath(nextLocation.pathname + nextLocation.search);
      // return false to prevent a transition
      return false;
    }
  }

  handleAlertStay = () => {
    this.props.doToggleUnsavedWarning();
    // reset nextRoutePath prop
    this.props.doStoreNextRoutePath('');
  }

  handleAlertLeave = () => {
    this.props.doToggleUnsavedWarning();
    this.context.router.push(this.props.nextRoutePath);
    // reset nextRoutePath prop
    this.props.doStoreNextRoutePath('');
  }

  render() {
    const editTransactionContainer = this.props.editTransactionVisible ? <EditTransactionContainer /> : null;
    const addTransactionContainer = this.props.addTransactionVisible ? <AddTransactionContainer activeAccountId={this.props.params.id} /> : null;
    return (
      <div className="col-xs-9">
        <AccountDetailsContainer />
        <TransactionsListContainer />
        { addTransactionContainer }
        { editTransactionContainer }
        <UnsavedWarning show={this.props.unsavedWarningVisible} localHandleAlertStay={this.handleAlertStay} localHandleAlertLeave={this.handleAlertLeave} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    addTransactionVisible: state.addTransactionVisible,
    editTransactionVisible: state.editTransactionVisible,
    unsavedWarningVisible: state.unsavedWarningVisible,
    uploadedTransactions: state.uploadedTransactions,
    nextRoutePath: state.nextRoutePath,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doResetUploadedTransactions: resetUploadedTransactions,
    doResetCurrentTransactions: resetCurrentTransactions,
    doToggleUnsavedWarning: toggleUnsavedWarning,
    doStoreNextRoutePath: storeNextRoutePath
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPageContainer);
