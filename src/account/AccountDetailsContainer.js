import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { resetUploadedTransactions } from './TransactionsActions.js';
import { toggleUnsavedWarning } from './AccountsActions.js';
import { storeNextRoutePath } from '../app/AppActions.js';
import AccountDetails from './AccountDetail.js';

class AccountDetailsContainer extends Component {
  static propTypes = {
    accounts: PropTypes.arrayOf(React.PropTypes.object),
    params: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    uploadedTransactions: PropTypes.arrayOf(React.PropTypes.object),
    doResetUploadedTransactions: PropTypes.func.isRequired,
    doToggleUnsavedWarning: PropTypes.func.isRequired,
    unsavedWarningVisible: PropTypes.bool.isRequired,
    doStoreNextRoutePath: PropTypes.func.isRequired,
    nextRoutePath: PropTypes.string.isRequired
  }
  static contextTypes = {
    router: React.PropTypes.object
  }
  componentDidMount() {
    this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
  }
  componentDidUpdate(prevProps) {
    if (this.props.params.id !== prevProps.params.id) {
      this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
    }
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

  findFaIcon(cc) {
    let iconSuffix;
    switch (cc) {
      case 'American Express':
        iconSuffix = 'cc-amex';
        break;
      case 'Other':
        iconSuffix = 'credit-card-alt';
        break;
      default:
        iconSuffix = 'cc-' + cc.toLowerCase().replace(/ /, '-');
    }
    return <i className={'fa fa-lg fa-fw fa-' + iconSuffix}></i>;
  }

  handleAlertStay = () => {
    this.props.doToggleUnsavedWarning();
    // reset nextRoutePath prop
    this.props.doStoreNextRoutePath('');
  }
  handleAlertLeave = () => {
    this.props.doResetUploadedTransactions();
    this.context.router.push(this.props.nextRoutePath);
    // reset nextRoutePath prop
    this.props.doStoreNextRoutePath('');
    this.props.doToggleUnsavedWarning();
  }

  render() {
    return (
      <AccountDetails
        accounts={this.props.accounts}
        handleAlertStay={this.handleAlertStay}
        handleAlertLeave={this.handleAlertLeave}
        params={this.props.params}
        unsavedWarningVisible={this.props.unsavedWarningVisible}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    uploadedTransactions: state.uploadedTransactions,
    unsavedWarningVisible: state.unsavedWarningVisible,
    nextRoutePath: state.nextRoutePath,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doResetUploadedTransactions: resetUploadedTransactions,
    doToggleUnsavedWarning: toggleUnsavedWarning,
    doStoreNextRoutePath: storeNextRoutePath
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetailsContainer);
