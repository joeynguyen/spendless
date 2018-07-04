import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import moment from 'moment';
import ManageTransaction from './ManageTransaction.jsx';

const mockOnSubmit = jest.fn(() => Promise.resolve());
const mockOnCancel = jest.fn();
const DATE_FORMAT = 'YYYY-MM-DD';
const props = {
  activeAccountId: '2018-03-12T04:44:13.400Z',
  activeTransaction: {},
  initialValues: {
    amount: '12.34',
    category: 'Auto',
    date: moment('2014-07-25', DATE_FORMAT),
    description: 'This is a description',
    notes: 'Add notes here',
  },
  manageTransactionVisible: true,
  manageType: 'edit',
  saveAccountTransactions: mockOnSubmit,
  toggleManageTransaction: mockOnCancel,
};

function setup() {
  return mount(<ManageTransaction {...props} />);
}
describe('ManageTransaction', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ManageTransaction {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('renders all the fields with correct values', () => {
    const component = setup();

    // the modal component has been moved to ManageTransactionContainer file
    xit('renders correct modal title', () => {
      expect(component.find('.ant-modal-title').text()).toEqual(
        'Edit Transaction'
      );
    });

    it('amount', () => {
      const amountField = component.find('input#amount');
      expect(amountField.length).toBe(1);
      expect(amountField.props().value).toBe('12.34');
    });

    it('category', () => {
      const categoryField = component.find('input#category');
      expect(categoryField.length).toBe(1);
      expect(categoryField.prop('value')).toBe('Auto');
    });

    it('date', () => {
      const dateField = component.find('input.ant-calendar-picker-input');
      expect(dateField.length).toBe(1);
      expect(dateField.prop('value')).toBe('2014-07-25');
    });

    it('description', () => {
      const descField = component.find('input#description');
      expect(descField.length).toBe(1);
      expect(descField.prop('value')).toBe('This is a description');
    });

    it('notes', () => {
      const notesField = component.find('textarea#notes');
      expect(notesField.length).toBe(1);
      expect(notesField.prop('value')).toBe('Add notes here');
    });
  });

  describe('has submit button that submits', () => {
    const component = setup();

    // the modal submit button has been moved to ManageTransactionContainer file
    xit('has submit button', () => {
      const submitBtn = component.find('button[type="submit"]');
      expect(submitBtn.length).toBe(1);
    });

    it('it submits on submit', done => {
      const spy = jest.spyOn(component.props(), 'saveAccountTransactions');

      expect(spy).not.toHaveBeenCalled();
      // We can't test clicking on submit button to perform 'submit' until
      // this bug is resolved - https://github.com/airbnb/enzyme/issues/308
      component.find('form').simulate('submit');
      expect(spy).toHaveBeenCalled();

      // done() is necessary; otherwise we get this error:
      // Timeout - Async callback was not invoked within the
      // 5000ms timeout specified by jest.setTimeout.
      done();
    });
  });

  // the modal cancel button has been moved to ManageTransactionContainer file
  // describe('has cancel button that cancels', () => {
  //   // const component = setup();
  //   const cancelBtn = component.find('button#cancel-manage-transaction');
  //   const spy = jest.spyOn(component.props(), 'toggleManageTransaction');

  //   it('cancel button exists', () => {
  //     expect(cancelBtn.length).toBe(1);
  //   });

  //   it('it cancels on click', done => {
  //     expect(spy).not.toHaveBeenCalled();
  //     cancelBtn.simulate('click');
  //     expect(spy).toHaveBeenCalled();

  //     // done() is necessary; otherwise we get this error:
  //     // Timeout - Async callback was not invoked within the
  //     // 5000ms timeout specified by jest.setTimeout.
  //     done();
  //   });
  // });
});
