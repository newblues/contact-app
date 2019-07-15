import { combineReducers } from 'redux';

import ReducerGif from './reducer-gif';

const rootReducer = combineReducers({
  gif: ReducerGif,
});

export default rootReducer;
