import { AT } from '../actions/action-types';

const initialState = {
  favorite: [],
};

export default function ReducerFavorite(state = initialState, action) {
  switch (action.type) {
    case AT.ADD_FAVORITE:
      return {
        ...state,
        favorite: [...state.favorite, action.payload],
      };
    case AT.DELETE_FAVORITE:
      const filteredFavorite = state.favorite.filter(id => id.id !== action.payload);
      return {
        ...state,
        favorite: filteredFavorite,
      };
    default:
      return state;
  }
}
