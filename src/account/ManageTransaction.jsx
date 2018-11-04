import PropTypes from 'prop-types';
import React from 'react';
import { message, Button, Col, DatePicker, Form, Input, Row } from 'antd';
import DrawerFooter from '../shared-components/DrawerFooter';
import { currencyUSDRegex } from '../utils/helpers';


const FormItem = Form.Item;
const { TextArea } = Input;

const ManageTransaction = (props) => {
  function handleSaveTransaction(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        // values.date is returned as a moment object so we have to convert it here
        const dateStringified = values.date.format('YYYY-MM-DD');
        let newTransactionObj;

        if (props.activeTransaction !== null) {
          // update transaction
          newTransactionObj = {
            ...props.activeTransaction,
            amount: Number(values.amount).toFixed(2),
            category: values.category,
            date: dateStringified,
            description: values.description,
            notes: values.notes,
          };
        } else {
          // add new transaction
          newTransactionObj = {
            _id: new Date().getTime().toString(),
            accountId: props.activeAccountId,
            amount: Number(values.amount).toFixed(2),
            category: values.category,
            date: dateStringified,
            description: values.description,
            month: props.activeMonth,
            notes: values.notes,
          };
        }

        // Save account in DB
        props
          .saveAccountTransactions(newTransactionObj)
          .then(() => {
            message.success('Transaction saved');
            // reset current transaction being edited to null
            props.toggleManageTransaction();
          })
          .catch(() => {
            message.error('Restart the application and retry');
          });
      }
    });
  }

  const { getFieldDecorator } = props.form;

  const currencyReg = currencyUSDRegex;

  return (
    <Form
      id="manage-transaction"
      onSubmit={handleSaveTransaction}
      layout="vertical"
    >
      <FormItem label="Description">
        {getFieldDecorator('description', {
          rules: [{ required: true, message: 'Enter a description' }],
        })(<Input />)}
      </FormItem>

      <Row>
        <Col span={8}>
          <FormItem label="Amount">
            {getFieldDecorator('amount', {
              rules: [
                { required: true, message: 'Enter an amount' },
                { pattern: currencyReg, message: 'Must be in valid US currency format' }
              ],
            })(<Input addonBefore="$" />)}
          </FormItem>
        </Col>

        <Col offset={4} span={12}>
          <FormItem label="Date">
            {getFieldDecorator('date', {
              rules: [{ required: true, message: 'Enter a date' }],
            })(<DatePicker />)}
          </FormItem>
        </Col>
      </Row>

      <FormItem label="Category">
        {getFieldDecorator('category', {
          rules: [{ required: true, message: 'Enter a category' }],
        })(<Input />)}
      </FormItem>

      <FormItem label="Notes" style={{ marginBottom: 5 }}>
        {getFieldDecorator('notes', {})(
          <TextArea rows={4} placeholder="Add notes for this transaction" />
        )}
      </FormItem>

      <DrawerFooter>
        <Button
          style={{marginRight: 8}}
          onClick={props.toggleManageTransaction}
        >
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">Submit</Button>
      </DrawerFooter>
    </Form>
  );
}

const WrappedManageTransaction = Form.create({
  mapPropsToFields(props) {
    return {
      amount: Form.createFormField({
        ...props.amount,
        value: props.initialValues.amount,
      }),
      category: Form.createFormField({
        ...props.category,
        value: props.initialValues.category,
      }),
      date: Form.createFormField({
        ...props.date,
        value: props.initialValues.date,
      }),
      description: Form.createFormField({
        ...props.description,
        value: props.initialValues.description,
      }),
      notes: Form.createFormField({
        ...props.notes,
        value: props.initialValues.notes,
      }),
    };
  },
})(ManageTransaction);

ManageTransaction.propTypes = {
  activeAccountId: PropTypes.string.isRequired,
  activeMonth: PropTypes.string.isRequired,
  activeTransaction: PropTypes.object,
  form: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  saveAccountTransactions: PropTypes.func.isRequired,
  toggleManageTransaction: PropTypes.func.isRequired,
};

export default WrappedManageTransaction;
