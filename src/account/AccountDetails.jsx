import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row } from 'antd';

import FileUpload from './FileUpload.jsx';
import AddTransactionButton from './AddTransactionButton.jsx';
import { getCreditIcon } from '../utils/icons.js';
import styles from './Account.module.css';

const AccountDetails = ({ accounts, activeAccountId, uploadedTransactionsExist }) => {
  const activeAccount = accounts.find(account => account._id === activeAccountId);
  let icon = null;
  if (activeAccount && activeAccount.type === 'creditcard') {
    const iconSuffix = getCreditIcon(activeAccount.company);
    icon = <i className={`fa fa-lg fa-fw fa-${iconSuffix}`}></i>;
  }

  return (
    <div>
      <div className="header">
        <h3 className={styles.header}>{activeAccount.name} {icon}<br />
          <small>{activeAccount.company}</small></h3>
      </div>
      <Row>
        <Col span={6}>
          <FileUpload accountId={activeAccountId} uploadedTransactionsExist={uploadedTransactionsExist} />
        </Col>
        <Col span={6}>
          <AddTransactionButton />
        </Col>
      </Row>
    </div>
  );
};
AccountDetails.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object),
  activeAccountId: PropTypes.string.isRequired,
  uploadedTransactionsExist: PropTypes.bool.isRequired,
};

export default AccountDetails;
