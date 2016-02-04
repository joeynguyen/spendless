import { combineReducers } from 'redux';
import AccountReducer from './account/AccountReducer.js';

const rootReducer = combineReducers({
  accounts: AccountReducer
});

export default rootReducer;
