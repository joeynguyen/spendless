import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FileUpload from './FileUpload.js';
import TransactionsList from './TransactionsList.js';
import SaveButton from './SaveButton.js';
import UnsavedWarning from './UnsavedWarning.js';
import styles from './Account.module.css';
import { resetUploadedTransactions } from './TransactionsActions.js';
import { toggleUnsavedWarning } from './AccountsActions.js';
import { storeNextRoutePath } from '../app/AppActions.js';

class AccountDetails extends Component {
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

  // logProps = () => {
  //   console.log('this.props', this.props);
  //   console.log('this.context.router', this.context.router);
  //   console.log('this.state', this.state);
  // }
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
    if (this.props.accounts.length < 1) {
      return <div><p className="text-center"><i className="fa fa-cog fa-spin fa-3x"></i></p></div>;
    }
    const activeAccount = this.props.accounts.find(account => account._id === this.props.params.id);
    if (!activeAccount) {
      return (
        <div className="col-xs-9">
          <div className="header">
            <h3 className={styles.header}>Error: Account Doesn't Exist</h3>
          </div>
          <p>Uh oh. Looks like the account you're looking for doesn't exist. It may have been deleted. Please click on one of the ones in the left sidebar to get details on a different account.</p>
        </div>
      );
    }
    let icon = '';
    if (activeAccount.type === 'creditcard') {
      icon = this.findFaIcon(activeAccount.company);
    }
    return (
      <div className="col-xs-9">
        <div className="header">
          <h3 className={styles.header}>{icon} {activeAccount.name} <br />
            <small>{activeAccount.company}</small></h3>
        </div>
        <FileUpload accountId={this.props.params.id} />
        <SaveButton />
        <TransactionsList accountId={this.props.params.id} />
        <UnsavedWarning show={this.props.unsavedWarningVisible} localHandleAlertStay={this.handleAlertStay} localHandleAlertLeave={this.handleAlertLeave} />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails);
