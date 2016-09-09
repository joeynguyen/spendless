import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import EditTransaction from './EditTransaction';

function setup() {
  // Need to create spies because if we use expect.spyOn on actual functions, we get this
  // error when test is run: "TypeError: Cannot assign to read only property 'doSubmit'"
  const mockOnSubmit = expect.createSpy();
  const mockOnCancel = expect.createSpy();
  const props = {
    pristine: true,
    toggleEditTransaction: mockOnCancel,
    doSubmit: mockOnSubmit,
    fields: {
      amount: {
        name: 'amount',
        value: '12.34',
      },
      category: {
        name: 'category',
        value: 'Auto',
      },
      date: {
        name: 'date',
        value: '2014-07-25',
      },
      description: {
        name: 'description',
        value: 'This is a description',
      },
      notes: {
        name: 'notes',
        value: 'Add notes here',
      }
    },
  };

  return mount(<EditTransaction {...props} />);
}

describe('EditTransaction', () => {
  const component = setup();

  describe('renders all the fields with correct values', () => {
    it('amount', () => {
      const amountField = component.find('input[name="amount"]');
      expect(amountField).toExist();
      expect(amountField.prop('value')).toBe('12.34');
    });

    it('category', () => {
      const categoryField = component.find('input[name="category"]');
      expect(categoryField).toExist();
      expect(categoryField.prop('value')).toBe('Auto');
    });

    it('date', () => {
      const dateField = component.find('input[name="date"]');
      expect(dateField).toExist();
      expect(dateField.prop('value')).toBe('2014-07-25');
    });

    it('description', () => {
      const descField = component.find('input[name="description"]');
      expect(descField).toExist();
      expect(descField.prop('value')).toBe('This is a description');
    });

    it('notes', () => {
      const notesField = component.find('textarea[name="notes"]');
      expect(notesField).toExist();
      expect(notesField.prop('value')).toBe('Add notes here');
    });
  });

  describe('has submit button that submits', () => {
    const submitBtn = component.find('button[type="submit"]');

    it('has submit button', () => {
      expect(submitBtn).toExist();
    });

    it('button initial state is disabled', () => {
      // test for existence b/c the prop either exists or doesn't exist,
      // it doesn't have a true or false value
      expect(submitBtn.prop('disabled')).toExist();
    });

    it('it submits on submit', (done) => {
      const spy = expect.spyOn(component.props(), 'doSubmit');

      // We can't test clicking on submit button to perform 'doSubmit' until
      // this bug is resolved - https://github.com/airbnb/enzyme/issues/308
      expect(spy.calls.length).toEqual(0);
      component.find('form').simulate('submit');
      expect(spy.calls.length).toEqual(1);

      spy.restore();
      done();
    });
  });

  describe('has cancel button that cancels', () => {
    const cancelBtn = component.find('#cancel-edit-transaction');

    it('cancel button exists', () => {
      expect(cancelBtn).toExist();
    });

    it('it cancels on click', (done) => {
      const spy = expect.spyOn(component.props(), 'toggleEditTransaction');

      expect(spy.calls.length).toEqual(0);
      cancelBtn.simulate('click');
      expect(spy.calls.length).toEqual(1);

      spy.restore();
      done();
    });
  });
});
