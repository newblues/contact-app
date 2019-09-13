import { combineReducers } from 'redux';

import { reducer as ReducerForm } from 'redux-form';
import ReducerContact from './reducer-contact';

const rootReducer = combineReducers({
  contact: ReducerContact,
  form: ReducerForm,
});

export default rootReducer;
