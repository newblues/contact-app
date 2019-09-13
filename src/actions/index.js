/* eslint-disable import/prefer-default-export */
/* eslint-disable func-names */
import { AT } from './action-types';

const END_POINT = `https://jsonplaceholder.typicode.com/users`;

export const getAllContact = () => {
  return function(dispatch) {
    dispatch({ type: AT.CONTACT_PENDING });
    fetch(`${END_POINT}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(json => {
        dispatch({ type: AT.GET_ALL_CONTACT, payload: json });
      })
      .catch(error => {
        console.log('TLC: getAllContact -> error', error);
        dispatch({ type: AT.CONTACT_ERROR, payload: error });
      });
  };
};

export const getContact = contact => {
  return function(dispatch) {
    dispatch({
      type: AT.GET_CONTACT,
      payload: contact,
    });
  };
};

export function addContact(fields) {
  return function(dispatch) {
    fetch(`${END_POINT}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        username: fields.username,
        email: fields.email,
        phone: fields.phone,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.status);
        }
        return response.json();
      })
      .then(json => {
        dispatch({ type: AT.ADD_CONTACT, payload: json });
      })
      .catch(error => {
        dispatch({ type: AT.CONTACT_ERROR, payload: error });
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
        if (!response.ok) {
          throw Error(response.status);
        }
        return response.json();
      })
      .then(() => {
        dispatch({ type: AT.DELETE_CONTACT, payload: id });
      })
      .catch(error => {
        dispatch({ type: AT.CONTACT_ERROR, payload: error });
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

export const updateContact = editContact => {
  console.log('TLC: editContact', editContact);
  return function(dispatch) {
    fetch(`${END_POINT}/${editContact.contact.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        username: editContact.username,
        email: editContact.email,
        phone: editContact.phone,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => {
        dispatch({ type: AT.UPDATE_CONTACT, payload: json });
      })
      .catch(error => {
        dispatch({ type: AT.CONTACT_ERROR, payload: error });
      });
  };
};

export const searchContact = searchInput => {
  return function(dispatch) {
    dispatch({
      type: AT.SEARCH_CONTACT,
      payload: searchInput,
    });
  };
};

export const displayFavorite = view => {
  return function(dispatch) {
    dispatch({
      type: AT.DISPLAY_FAVORITE,
      payload: view,
    });
  };
};
