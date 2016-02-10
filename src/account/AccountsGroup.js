import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { selectAccount } from './AccountsActions.js';
import { fetchAccountTransactions } from './TransactionsActions.js';

const styles = {
  listGroupItem: {
    outline: 'none'
  }
};

class AccountsGroup extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    accounts: PropTypes.array.isRequired,
    activeAccount: PropTypes.object,
    doSelectAccount: PropTypes.func.isRequired,
    doFetchAccountTransactions: PropTypes.func.isRequired,
  }
  handleAccountSelect(account) {
    this.props.doSelectAccount(account);
    this.props.doFetchAccountTransactions(account);
  }
  render() {
    const panelHeader = (
      <div>
        <i className={'fa fa-lg fa-fw fa-' + this.props.icon }></i>
        {` ${this.props.title}`}
      </div>
    );
    return (
      <Panel collapsible defaultExpanded header={panelHeader}>
        <ListGroup fill>
          {
            this.props.accounts.map((account) => {
              const isActive = (this.props.activeAccount !== null && account._id === this.props.activeAccount._id) ? true : false;
              return (
                <ListGroupItem
                  style={styles.listGroupItem}
                  active={isActive}
                  key={account._id}
                  onClick={() => this.handleAccountSelect(account)}
                >
                  {account.name}
                </ListGroupItem>
              );
            })
          }
        </ListGroup>
      </Panel>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeAccount: state.activeAccount
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doSelectAccount: selectAccount, doFetchAccountTransactions: fetchAccountTransactions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsGroup);
