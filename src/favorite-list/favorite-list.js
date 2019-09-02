import React from 'react';

import { Container, Col, Table } from 'reactstrap';

import './contact-list.css';

import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const FavoriteList = props => {
  const { contact } = props;

  return (
    <div className="rowContainer">
      <Col xs="1">
        {' '}
        <img className="rounded-circle" src="https://picsum.photos/35" alt="new" />
      </Col>
      <Col xs="3">{contact.username}</Col>
      <Col xs="3">{contact.name}</Col>
      <Col xs="3">{contact.email}</Col>
      <Col xs="2">
        <FaEdit />
        <FaTrashAlt className="trash" onClick={() => props.deleteContactCallBack(contact)} />
      </Col>
    </div>
  );
};

export default FavoriteList;
