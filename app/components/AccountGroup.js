import React, { Component, PropTypes } from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class AccountGroup extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }
  render() {
    const panelHeader = (<div><i className={'fa fa-lg fa-fw fa-' + this.props.icon }></i> {this.props.title}</div>);
    return (
      <Panel collapsible defaultExpanded header={panelHeader}>
        <ListGroup fill>
          <ListGroupItem>Chase</ListGroupItem>
          <ListGroupItem>Bank of America</ListGroupItem>
          <ListGroupItem>&hellip;</ListGroupItem>
        </ListGroup>
      </Panel>
    );
  }
}
