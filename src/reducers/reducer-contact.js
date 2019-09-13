import { AT } from '../actions/action-types';

const initialState = {
  pending: false,
  error: null,
  contact: [],
  favorite: [],
  search: '',
  contactSelected: '',
  displayFavorite: false,
};

export default function ReducerContact(state = initialState, action) {
  switch (action.type) {
    case AT.DISPLAY_FAVORITE:
      return {
        ...state,
        displayFavorite: action.payload,
      };
    case AT.CONTACT_PENDING:
      return {
        ...state,
        pending: true,
      };
    case AT.CONTACT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case AT.GET_ALL_CONTACT:
      return {
        ...state,
        pending: false,
        contact: action.payload,
      };

    case AT.GET_CONTACT:
      return {
        ...state,
        contactSelected: action.payload,
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
    case AT.SEARCH_CONTACT:
      return {
        ...state,
        search: action.payload,
      };
    case AT.UPDATE_CONTACT:
      const editContact = state.contact.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            phone: action.payload.phone,
            username: action.payload.username,
            email: action.payload.email,
          };
        }
        return item;
      });
      return {
        ...state,
        contact: editContact,
      };

    default:
      return state;
  }
}
