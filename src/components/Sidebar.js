import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './Sidebar.module.css';
import SidebarHeader from './SidebarHeader.js';
import AccountGroup from '../account/AccountGroup.js';
import { fetchAccounts } from '../account/AccountActions.js';
import ManageAccountsWindow from './ManageAccounts.js';

// PouchDB is loaded externally through a script tag in the browser
// const db = new PouchDB('accounts');

class Sidebar extends Component {
  static propTypes = {
    fetchAccounts: PropTypes.func.isRequired,
    accounts: PropTypes.array
  }

  state = {
    showModal: false,
    accounts: [],
  }
  componentDidMount() {
    this.props.fetchAccounts();
  }
  onNewAccount = (newAccount) => {
    this.setState({
      accounts: this.state.accounts.concat(newAccount)
    });
  }
  close = () => {
    this.setState({ showModal: false });
  }
  open = () => {
    this.setState({ showModal: true });
  }
  render() {
    if (!this.props.accounts) {
      return <div>Loading...</div>;
    }
    const ccAccounts = this.props.accounts.filter((account) => {
      return account.type === 'creditcard';
    });
    const bankAccounts = this.props.accounts.filter((account) => {
      return account.type === 'bank';
    });
    return (
      <div id="sidebar" className={styles.sidebar + ' col-xs-3 sidebar'}>
        <SidebarHeader open={this.open} />
        <AccountGroup title="Banks" icon="bank" accounts={bankAccounts} />
        <AccountGroup title="Credit Cards" icon="credit-card" accounts={ccAccounts} />
        <ManageAccountsWindow showModal={this.state.showModal} close={this.close} onNewAccount={this.onNewAccount} />
      </div>
    );
  }
}

// Anything returned from this function will end up as props
// on the BookList container
function mapStateToProps(state) {
  console.log('state', state);
  return {
    // state comes from the <Provider>'s 'store' property in index.js
    accounts: state.accounts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAccounts }, dispatch);
}

// Promote AccountGroup from a Component to a Container, a
// component that is aware of the state that's contained by Redux
// 'connect' takes a Function and a Component and produces a Container
// arguments are passed into the Container as props(?)
// https://github.com/rackt/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
// export default connect(mapStateToProps, mapDispatchToProps)(AccountGroup);
