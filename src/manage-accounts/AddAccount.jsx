import React, { Component } from 'react';
import { AddIcon, Animate, Box, Button } from 'grommet';
import AddAccountFormContainer from './AddAccountFormContainer.jsx';

export default class AddAccount extends Component {
  state = {
    addAccountVisible: false,
  }
  toggleAddAccount = () => {
    this.setState({ addAccountVisible: !this.state.addAccountVisible });
  }
  render() {
    const addAccountVisible = this.state.addAccountVisible;
    const btnIcon = addAccountVisible ? null : <AddIcon />;
    const btnLabel = addAccountVisible ? 'Cancel' : 'Add Account';
    return (
      <div>
        <Box size="small" pad={{vertical: 'medium'}}>
          <Button
            icon={btnIcon}
            critical={addAccountVisible}
            label={btnLabel}
            onClick={this.toggleAddAccount}
          />
        </Box>
        <Animate
          visible={addAccountVisible}
          enter={{animation: 'slide-down', duration: 300, delay: 0}}
        >
          <AddAccountFormContainer visible={this.state.addAccountVisible} />
        </Animate>
      </div>
    );
  }
}
