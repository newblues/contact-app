/* eslint-disable import/prefer-default-export */
/* eslint-disable func-names */
import { AT } from './action-types';

const END_POINT = `https://jsonplaceholder.typicode.com/users`;

export const fetchContact = () => {
  return function(dispatch) {
    dispatch({ type: AT.FETCH_CONTACT_PENDING });
    fetch(`${END_POINT}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch({ type: AT.FETCH_CONTACT_SUCCESS, payload: json });
      })
      .catch(error => {
        dispatch({ type: AT.FETCH_CONTACT_ERROR, payload: error });
      });
  };
};

export function addContact(newContact) {
  return function(dispatch) {
    fetch(`${END_POINT}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        name: newContact.name,
        username: newContact.userName,
        email: newContact.email,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch({ type: AT.ADD_CONTACT, payload: json });
        console.log('TLC: addContact -> json', json);
      })
      .catch(error => {
        dispatch({ type: AT.FETCH_CONTACT_ERROR, payload: error });
      });
  };
}

export const deleteContact = id => {
  return function(dispatch) {
    fetch(`${END_POINT}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('Something went wrong ...');
      })
      .then(() => {
        dispatch({ type: AT.DELETE_CONTACT, payload: id });
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export const addFavorite = contact => {
  return function(dispatch) {
    dispatch({
      type: AT.ADD_FAVORITE,
      payload: contact,
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
