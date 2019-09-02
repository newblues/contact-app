import { combineReducers } from 'redux';

import ReducerContact from './reducer-contact';

const rootReducer = combineReducers({
  contact: ReducerContact,
});

export default rootReducer;
