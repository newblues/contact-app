import { AT } from '../actions/action-types';

const initialState = {
  pending: false,
  contact: [],
  error: null,
  favorite: [],
};

export default function ReducerContact(state = initialState, action) {
  switch (action.type) {
    case AT.FETCH_CONTACT_PENDING:
      return {
        ...state,
        pending: true,
      };
    case AT.FETCH_CONTACT_SUCCESS:
      return {
        ...state,
        pending: false,
        contact: action.payload,
      };
    case AT.FETCH_CONTACT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case AT.ADD_CONTACT:
      return {
        ...state,
        contact: [...state.contact, action.payload],
      };

    case AT.DELETE_CONTACT:
      return {
        ...state,
        contact: state.contact.filter(item => item.id !== action.payload),
      };
    case AT.ADD_FAVORITE:
      return {
        ...state,
        favorite: [...state.favorite, action.payload],
      };
    case AT.DELETE_FAVORITE:
      return {
        ...state,
        favorite: state.favorite.filter(item => item.id !== action.payload),
      };

    default:
      return state;
  }
}
