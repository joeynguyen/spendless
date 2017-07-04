import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'antd';

const SidebarHeader = ({ toggleManageAccounts }) => {
  return (
    <Button
      style={{borderRadius: 0, 'width': '100%'}}
      type="primary"
      icon="edit"
      size="large"
      onClick={toggleManageAccounts}
    >Edit Accounts</Button>
  );
};

SidebarHeader.propTypes = {
  toggleManageAccounts: PropTypes.func.isRequired,
};

export default SidebarHeader;
