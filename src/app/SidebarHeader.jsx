import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Animate, Box, EditIcon, Heading, Tip } from 'grommet';
import styles from './Sidebar.module.css';

class SidebarHeader extends Component {
  state = {
    editTipVisible: false,
  }
  render() {
    return (
      <div>
        <Box direction="row" align="center" justify="between">
          <Heading tag="h3">Accounts</Heading>
          <EditIcon
            onMouseOver={() => this.setState({editTipVisible: true})}
            onMouseLeave={() => this.setState({editTipVisible: false})}
            id="accounts-edit-icon"
            size="small"
            className={styles['accounts-edit']}
            onClick={this.props.toggleManageAccounts}
          />
        </Box>
        <Animate
          enter={{animation: 'fade', duration: 100, delay: 0}}
          visible={this.state.editTipVisible}
        >
          <Tip target="accounts-edit-icon" onClose={() => {}}>Edit</Tip>
        </Animate>
      </div>
    );
  }
}

SidebarHeader.propTypes = {
  toggleManageAccounts: PropTypes.func.isRequired,
};

export default SidebarHeader;
