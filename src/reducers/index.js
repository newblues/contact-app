import { combineReducers } from 'redux';

import ReducerGif from './reducer-gif';
import ReducerFavorite from './favorite-reducer';
import ReducerGifByID from './reducer-gifbyid';

const rootReducer = combineReducers({
  gif: ReducerGif,
  favorite: ReducerFavorite,
  gifById: ReducerGifByID,
});

export default rootReducer;
