import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import EditTransaction from './EditTransaction';

function setup() {
  const props = {
    pristine: false,
    toggleEditTransaction: () => {},
    doSubmit: () => {},
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
  describe('renders all the fields with correct values', () => {
    const wrapper = setup();

    it('amount', () => {
      const amountField = wrapper.find('input[name="amount"]');
      expect(amountField).toExist();
      expect(amountField.prop('value')).toBe('12.34');
    });

    it('category', () => {
      const categoryField = wrapper.find('input[name="category"]');
      expect(categoryField).toExist();
      expect(categoryField.prop('value')).toBe('Auto');
    });

    it('date', () => {
      const dateField = wrapper.find('input[name="date"]');
      expect(dateField).toExist();
      expect(dateField.prop('value')).toBe('2014-07-25');
    });

    it('description', () => {
      const descField = wrapper.find('input[name="description"]');
      expect(descField).toExist();
      expect(descField.prop('value')).toBe('This is a description');
    });

    it('notes', () => {
      const notesField = wrapper.find('textarea[name="notes"]');
      expect(notesField).toExist();
      expect(notesField.prop('value')).toBe('Add notes here');
    });
  });
});
