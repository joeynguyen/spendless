import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FileUpload from './FileUpload.js';
import TransactionsList from './TransactionsList.js';
import SaveButton from './SaveButton.js';
import UnsavedWarning from './UnsavedWarning.js';
import styles from './Account.module.css';
import { resetUploadedTransactions } from './TransactionsActions.js';
import { showUnsavedWarning } from './AccountsActions.js';
import { storeNextRoutePath } from '../app/AppActions.js';

class AccountDetails extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    uploadedTransactions: PropTypes.arrayOf(React.PropTypes.object),
    doResetUploadedTransactions: PropTypes.func.isRequired,
    doShowUnsavedWarning: PropTypes.func.isRequired,
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
    // console.log('this.context.router', this.context.router);
    // console.log('this', this);
    // console.log('prevProps', prevProps);
    if (this.props.params.id !== prevProps.params.id) {
      console.log('settingRouteLeaveHook!');
      this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
    }
  }
  routerWillLeave = (nextLocation) => {
    console.log('nextLocation', nextLocation);
    console.log('this.props', this.props);
    // return false to prevent a transition w/o prompting the user,
    // or return a string to allow the user to decide:
    if (this.props.uploadedTransactions.length > 0 && this.props.nextRoutePath === '') {
      // need to check for nextRoutePath as null or else this will run again when
      // handleAlertLeave() is called and returns false for changing routes with
      // this.context.router.push(this.props.nextRoutePath);
      this.props.doShowUnsavedWarning(true);
      this.props.doStoreNextRoutePath(nextLocation.pathname + nextLocation.search);
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
    this.props.doShowUnsavedWarning(false);
    this.props.doStoreNextRoutePath('');
  }
  handleAlertLeave = () => {
    this.props.doResetUploadedTransactions();
    this.context.router.push(this.props.nextRoutePath);
    this.props.doStoreNextRoutePath('');
    this.props.doShowUnsavedWarning(false);
  }

  render() {
    const { accountName, accountCompany, accountType } = this.props.location.query;
    let icon = '';
    if (accountType === 'creditcard') {
      icon = this.findFaIcon(accountCompany);
    }
    return (
      <div className="col-xs-9">
        <div className="header">
          <h3 className={styles.header}>{icon} {accountName} <br />
            <small>{accountCompany}</small></h3>
        </div>
        <FileUpload accountId={this.props.params.id} />
        <SaveButton />
        <TransactionsList accountId={this.props.params.id} />
        {/* <button onClick={this.logProps}>console.log(props)</button> */}
        <UnsavedWarning show={this.props.unsavedWarningVisible} localHandleAlertStay={this.handleAlertStay} localHandleAlertLeave={this.handleAlertLeave} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    uploadedTransactions: state.uploadedTransactions,
    unsavedWarningVisible: state.unsavedWarningVisible,
    nextRoutePath: state.nextRoutePath,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doResetUploadedTransactions: resetUploadedTransactions,
    doShowUnsavedWarning: showUnsavedWarning,
    doStoreNextRoutePath: storeNextRoutePath
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails);
