import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { selectAccount } from './AccountsActions.js';

class AccountsGroup extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    accounts: PropTypes.array.isRequired,
    doSelectAccount: PropTypes.func.isRequired,
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
              return (
                <ListGroupItem key={account._id} onClick={() => this.props.doSelectAccount(account)}>{account.name}</ListGroupItem>
              );
            })
          }
        </ListGroup>
      </Panel>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doSelectAccount: selectAccount }, dispatch);
}

export default connect(null, mapDispatchToProps)(AccountsGroup);
