import PropTypes from 'prop-types';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './Sidebar.module.css';

const SidebarHeader = ({ toggleManageAccounts }) => {
  const editTooltip = (<Tooltip id="edit-tooltip">Edit</Tooltip>);
  return (
    <h3 className="clearfix">
      <span className="pull-left">Accounts</span>
      <span className="pull-right">
        <OverlayTrigger placement="top" overlay={editTooltip}>
          <i
            id="accounts-edit"
            onClick={toggleManageAccounts}
            className={styles['accounts-edit'] + ' fa fa-fw fa-edit'}>
          </i>
        </OverlayTrigger>
      </span>
    </h3>
  );
};

SidebarHeader.propTypes = {
  toggleManageAccounts: PropTypes.func.isRequired,
};

export default SidebarHeader;
