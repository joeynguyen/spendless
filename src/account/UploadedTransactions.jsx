import PropTypes from 'prop-types';
import React from 'react';
import { Button, Modal, Table } from 'antd';

const mapTransactionData = data =>
  data.map(transaction => ({
    amount: transaction.amount,
    category: transaction.category,
    date: transaction.date,
    description: transaction.description,
    key: transaction._id,
  }));

const renderColumns = [
  {
    dataIndex: 'date',
    title: 'Date',
  },
  {
    dataIndex: 'description',
    title: 'Description',
  },
  {
    dataIndex: 'category',
    title: 'Category',
  },
  {
    className: 'column-amount',
    dataIndex: 'amount',
    render: amount => (
      <span className={amount > 0 ? 'positive-amount' : ''}>
        {Number(amount).toFixed(2)}
      </span>
    ),
    title: 'Amount',
  },
];

const UploadedTransactions = ({
  uploadedTransactions,
  negateUploadedTransactions,
  resetUploadedTransactions,
  handleSave,
}) => {
  const data = mapTransactionData(uploadedTransactions);
  const modalFooter = [
    <Button
      key="confirm"
      type="primary"
      id="save-uploaded-transactions"
      onClick={handleSave}
    >
      Save
    </Button>,
    <Button
      key="cancel"
      id="cancel-manage-uploaded-transactions"
      size="large"
      onClick={resetUploadedTransactions}
    >
      Cancel
    </Button>,
  ];

  return (
    <Modal
      id="UploadedTransactions"
      closable
      maskClosable={false}
      visible={uploadedTransactions.length > 0}
      onCancel={resetUploadedTransactions}
      title="Manage Uploaded Transactions"
      footer={modalFooter}
      width={840}
    >
      <Button
        id="negate-uploaded-transactions-amounts"
        onClick={negateUploadedTransactions}
      >
        My amounts are the opposite of what they should be
      </Button>
      <Table columns={renderColumns} dataSource={data} />
    </Modal>
  );
};

UploadedTransactions.propTypes = {
  handleSave: PropTypes.func.isRequired,
  negateUploadedTransactions: PropTypes.func.isRequired,
  resetUploadedTransactions: PropTypes.func.isRequired,
  uploadedTransactions: PropTypes.arrayOf(PropTypes.object),
};

export default UploadedTransactions;
