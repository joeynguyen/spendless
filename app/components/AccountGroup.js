import React, { Component, PropTypes } from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class AccountGroup extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    accounts: PropTypes.array.isRequired,
  }
  render() {
    const panelHeader = (<div><i className={'fa fa-lg fa-fw fa-' + this.props.icon }></i> {this.props.title}</div>);
    return (
      <Panel collapsible defaultExpanded header={panelHeader}>
        <ListGroup fill>
          {
            this.props.accounts.map(function(account) {
              return (
                <LinkContainer to={'/account/' + account._id} key={account._id}>
                  <ListGroupItem>{account.name}</ListGroupItem>
                </LinkContainer>
              );
            })
          }
        </ListGroup>
      </Panel>
    );
  }
}
