import PropTypes from 'prop-types';
import React from 'react';
import { Button, Modal, Table } from 'antd';

const mapTransactionData = (data) => data.map(transaction => ({
  key: transaction._id,
  amount: transaction.amount,
  category: transaction.category,
  date: transaction.date,
  description: transaction.description,
}));

const renderColumns = [
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Amount',
    className: 'column-amount',
    dataIndex: 'amount',
    render: (amount) => (
      <span className={amount > 0 ? 'positive-amount' : ''}>
        {Number(amount).toFixed(2)}
      </span>
    ),
  },
];

const UploadedTransactions = ({
  uploadedTransactions,
  negateUploadedTransactions,
  resetUploadedTransactions,
  handleSave
}) => {
  const data = mapTransactionData(uploadedTransactions);
  const modalFooter = [(
    <Button
      key="confirm"
      type="primary"
      id="save-uploaded-transactions"
      onClick={handleSave}
    >Save</Button>
  ), (
    <Button
      key="cancel"
      id="cancel-manage-uploaded-transactions"
      size="large"
      onClick={resetUploadedTransactions}
    >Cancel</Button>
  )];

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
      >My amounts are the opposite of what they should be</Button>
      <Table columns={renderColumns} dataSource={data} />
    </Modal>
  );
};

UploadedTransactions.propTypes = {
  uploadedTransactions: PropTypes.arrayOf(PropTypes.object),
  negateUploadedTransactions: PropTypes.func.isRequired,
  resetUploadedTransactions: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default UploadedTransactions;
