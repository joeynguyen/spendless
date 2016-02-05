import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AccountsGroup from './AccountsGroup.js';
import { fetchAccounts } from './AccountsActions.js';

class AccountContainer extends Component {
  static propTypes = {
    doFetchAccounts: PropTypes.func.isRequired,
    accounts: PropTypes.array
  }

  componentDidMount() {
    this.props.doFetchAccounts();
  }

  render() {
    if (!this.props.accounts) {
      return <div>Loading...</div>;
    }
    const ccAccounts = this.props.accounts.filter(account => account.type === 'creditcard');
    const bankAccounts = this.props.accounts.filter(account => account.type === 'bank');
    return (
      <div>
        <AccountsGroup title="Banks" icon="bank" accounts={bankAccounts} />
        <AccountsGroup title="Credit Cards" icon="credit-card" accounts={ccAccounts} />
      </div>
    );
  }
}

// Anything returned from this function will end up as props
// on the AccountContainer container
function mapStateToProps(state) {
  return {
    // state comes from the <Provider>'s 'store' property in index.js
    accounts: state.accounts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doFetchAccounts: fetchAccounts }, dispatch);
}

// Promote AccountContainer from a Component to a Container, a
// component that is aware of the state that's contained by Redux
// 'connect' takes a Function and a Component and produces a Container
// arguments are passed into the Container as props(?)
// https://github.com/rackt/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
