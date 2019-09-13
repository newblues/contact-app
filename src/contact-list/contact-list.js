import React, { useState } from 'react';

import { Col } from 'reactstrap';

import './contact-list.css';

import { FaTrashAlt, FaStar } from 'react-icons/fa';

import ContacUpdate from '../contact-update/contact-update';

const styles = {
  star: {
    color: '#ecf0f1',
  },
  starIsFavorite: {
    color: '#0069D9',
  },
};

const ContactList = props => {
  //
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

  const stringToColor = string => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let colour = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return colour;
  };

  return (
    <div className="rowContainer">
      <Col xs="1" className="" onClick={() => props.getContactCallBack(contact)}>
        <div style={{ backgroundColor: stringToColor(contact.username) }} className="circle">
          <span className="initials">{contact.username.charAt(0)}</span>
        </div>
      </Col>
      <Col className="" xs="3" onClick={() => props.getContactCallBack(contact)}>
        {contact.username}
      </Col>
      <Col className="d-none d-md-block" onClick={() => props.getContactCallBack(contact)} md="3">
        {contact.email}
      </Col>
      <Col className="d-none d-lg-block" onClick={() => props.getContactCallBack(contact)} lg="3">
        {contact.phone}
      </Col>
      <Col xs="4" md="2" className="d-flex justify-content-around align-items-center ">
        {star ? (
          <FaStar
            className="icon"
            style={styles.starIsFavorite}
            onClick={() => deleteFavorite(contact)}
          />
        ) : (
          <FaStar className="icon" style={styles.star} onClick={() => addFavorite(contact)} />
        )}
        <ContacUpdate contact={contact} />
        <FaTrashAlt className="icon" onClick={() => props.deleteContactCallBack(contact)} />
      </Col>
    </div>
  );
};

export default ContactList;
