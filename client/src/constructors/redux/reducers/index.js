import { combineReducers } from 'redux';
import layout from './layout';
import wallets from './wallets';
import transfers from './transfers';

const rootReducer = combineReducers({
  layout,
  transfers,
  wallets,
});

export default rootReducer;
