/* eslint-disable func-names */
import { AT } from './action-types';

const API_KEY = '4ueA0b70vM5mxJfQvosMszE6hyddpNMj';
const END_POINT = `http://api.giphy.com/v1/gifs/`;

export const fetchGif = search => {
  return function(dispatch) {
    dispatch({ type: AT.FETCH_GIF_PENDING });
    fetch(`${END_POINT}search?q=${search}&api_key=${API_KEY}&limit=5}`)
      .then(response => response.json())
      .then(response => {
        dispatch({ type: AT.FETCH_GIF_SUCCESS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: AT.FETCH_GIF_ERROR, payload: error });
      });
  };
};

export const fetchGifById = id => {
  return function(dispatch) {
    dispatch({ type: AT.FETCH_GIFBYID_PENDING });
    fetch(`${END_POINT}gif_id=${id}&api_key=${API_KEY}`, {
      mode: 'no-cors',
    })
      .then(response => response.json())
      .then(response => {
        dispatch({ type: AT.FETCH_GIFBYID_SUCCESS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: AT.FETCH_GIFBYID_ERROR, payload: error });
      });
  };
};

export const addFavorite = gif => {
  return function(dispatch) {
    dispatch({
      type: AT.ADD_FAVORITE,
      payload: gif,
    });
  };
};

export const deleteFavorite = id => {
  return function(dispatch) {
    dispatch({
      type: AT.DELETE_FAVORITE,
      payload: id,
    });
  };
};
