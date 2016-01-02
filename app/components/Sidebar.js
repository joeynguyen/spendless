import React, { Component } from 'react';
import { OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap';
import styles from './Sidebar.module.css';
import AccountGroup from './AccountGroup.js';

export default class Home extends Component {
  state = {
    showModal: false
  }
  close = () => {
    this.setState({ showModal: false });
  }
  open = () => {
    this.setState({ showModal: true });
  }
  render() {
    const editTooltip = (<Tooltip id="edit-tooltip">Edit</Tooltip>);
    return (
      <div id="sidebar" className={styles.sidebar + ' col-xs-3'}>
        <h3 className={styles['sidebar-header'] + ' clearfix'}>
          <span className="pull-left">Accounts</span>
          <span className="pull-right">
            <OverlayTrigger placement="top" overlay={editTooltip}>
              <i id="accounts-edit" onClick={this.open} className={styles['accounts-edit'] + ' fa fa-fw fa-edit'}></i>
            </OverlayTrigger>
          </span>
        </h3>
        <AccountGroup title="Banks" icon="bank" />
        <AccountGroup title="Credit Cards" icon="credit-card" />
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
