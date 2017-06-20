import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Box, Button, Form, TextInput } from 'grommet';

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
      <Form id="delete-account-form" onSubmit={this.props.handleDeleteAccount}>
        <hr />
        <p>Type DELETE into this box to confirm</p>
        <Box>
          <TextInput
            value={this.state.confirmDeleteText}
            onDOMChange={this.handleConfirmDeleteText}
            placeHolder="DELETE"
          />
          <Box direction="row" justify="between" pad={{vertical: 'small'}}>
            <Button
              // how to disable Grommet Button - https://github.com/grommet/grommet/issues/1089
              type={this.state.confirmDeleteText === 'DELETE' ? 'submit' : 'button' }
              critical
              label="Confirm"
            />
            <Button
              className="cancel-delete"
              type="button"
              label="Cancel"
              onClick={this.props.toggleConfirmDelete}
            />
          </Box>
        </Box>
      </Form>
    );
  }
}
