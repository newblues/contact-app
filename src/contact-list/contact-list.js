import React, { useState } from 'react';

import { Container, Col, Table } from 'reactstrap';

import './contact-list.css';

import { FaEdit, FaTrashAlt, FaStar } from 'react-icons/fa';

const styles = {
  icon: {
    color: '#ecf0f1',
  },
  iconIsFavorite: {
    color: '#f1c40f',
  },
};

const ContactList = props => {
  const { contact, star } = props;

  const [isFavorite, setFavorite] = useState(false);

  const addFavorite = contact => {
    props.addFavoriteCallBack(contact, !isFavorite);
    setFavorite(!isFavorite);
  };

  const deleteFavorite = contact => {
    props.deleteFavoriteCallBack(contact.id);
    setFavorite(!isFavorite);
  };

  return (
    <div className="rowContainer">
      <Col xs="1">
        {' '}
        <img className="rounded-circle" src="https://picsum.photos/35" alt="new" />
      </Col>
      <Col xs="3">{contact.name}</Col>
      <Col xs="3">{contact.username}</Col>
      <Col xs="3">{contact.email}</Col>
      <Col xs="2">
        {star ? (
          <FaStar style={styles.iconIsFavorite} onClick={() => deleteFavorite(contact)} />
        ) : (
          <FaStar style={styles.icon} onClick={() => addFavorite(contact)} />
        )}
        <FaEdit />
        <FaTrashAlt className="trash" onClick={() => props.deleteContactCallBack(contact)} />
      </Col>
    </div>
  );
};

export default ContactList;
