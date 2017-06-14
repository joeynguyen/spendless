import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Animate, Box, EditIcon, Tip } from 'grommet';
import styles from './Sidebar.module.css';

class SidebarHeader extends Component {
  state = {
    editTipVisible: false,
  }
  render() {
    return (
      <div>
        <Box direction="row" align="start" justify="between">
          <h4>Accounts</h4>
          <EditIcon
            onMouseOver={() => this.setState({editTipVisible: true})}
            onMouseLeave={() => this.setState({editTipVisible: false})}
            id="edit-icon"
            size="small"
            className={styles['accounts-edit']}
            onClick={this.props.toggleManageAccounts}
          />
        </Box>
        <Animate
          enter={{animation: 'fade', duration: 100, delay: 0}}
          visible={this.state.editTipVisible}
        >
          <Tip target="edit-icon" onClose={() => {}}>Edit</Tip>
        </Animate>
      </div>
    );
  }
}

SidebarHeader.propTypes = {
  toggleManageAccounts: PropTypes.func.isRequired,
};

export default SidebarHeader;
