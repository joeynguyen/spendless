import { ADD_UPLOADED_TRANSACTIONS } from './TransactionsActions.js';

export default function(state = [], action) {
  console.log('UploadedTransactionsReducer: action received', action);

  switch (action.type) {
    case ADD_UPLOADED_TRANSACTIONS:
      return action.payload;
    default:
      return state;
  }
}
