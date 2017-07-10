import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Col, Row, Button, Input } from 'antd';

export default class DeleteAccountForm extends Component {
  static propTypes = {
    toggleConfirmDelete: PropTypes.func.isRequired,
    handleDeleteAccount: PropTypes.func.isRequired,
  }

  state = {
    confirmDeleteText: '',
  }

  handleConfirmDeleteText = (e) => {
    this.setState({ confirmDeleteText: e.target.value });
  }

  render() {
    return (
      <form id="delete-account-form" onSubmit={this.props.handleDeleteAccount}>
        <p>Type DELETE into this box to confirm</p>
        <Row>
          <Col span={8}>
            <Input
              placeholder="DELETE"
              onChange={this.handleConfirmDeleteText}
              value={this.state.confirmDeleteText}
            />
          </Col>
          <Col span={16}>
            <div className="float-right">
              <Button
                className="confirm-delete"
                disabled={this.state.confirmDeleteText !== 'DELETE'}
                type="primary"
                htmlType="submit"
              >Confirm</Button>
              {' '}
              <Button
                className="cancel-delete"
                onClick={this.props.toggleConfirmDelete}
              >Cancel</Button>
            </div>
          </Col>
        </Row>
      </form>
    );
  }
}
