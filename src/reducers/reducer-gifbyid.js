import { AT } from '../actions/action-types';

const initialState = {
  pending: false,
  gif: [],
  error: null,
};

export default function ReducerGifByID(state = initialState, action) {
  switch (action.type) {
    case AT.FETCH_GIFBYID_PENDING:
      return {
        ...state,
        pending: true,
      };
    case AT.FETCH_GIFBYID_SUCCESS:
      return {
        ...state,
        pending: false,
        gif: action.payload,
      };
    case AT.FETCH_GIFBYD_ERROR:
      return {
        ...state,
        pending: null,
        error: action.error,
      };
    default:
      return state;
  }
}
