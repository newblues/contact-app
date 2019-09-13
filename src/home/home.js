import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

import {
  getAllContact,
  getContact,
  deleteContact,
  addFavorite,
  deleteFavorite,
  updateContact,
} from '../actions/index';

import ContactList from '../contact-list/contact-list';
import Loader from '../loader/loader';

import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      displayFavorite: false,
    };
  }

  componentDidMount() {
    const { getAllContact } = this.props;
    getAllContact();
  }

  renderContactList = () => {
    const { contact, pending, favorite, search, displayFavorite } = this.props;

    if (pending) {
      return (
        <div className="loader">
          <Loader />
        </div>
      );
    }

    if (displayFavorite) {
      return this.renderFavorite();
    }

    return contact
      .filter(contact => {
        return contact.username.toLowerCase().search(search.toLowerCase()) !== -1;
      })

      .map(contact => (
        <ContactList
          key={contact.id}
          contact={contact}
          getContactCallBack={this.getContact}
          deleteContactCallBack={this.deleteContact}
          addFavoriteCallBack={this.addFavorite}
          deleteFavoriteCallBack={this.deleteFavorite}
          updateContactCallback={this.updateContact}
          star={favorite.some(item => item.id === contact.id)}
        />
      ));
  };

  renderFavorite = () => {
    const { favorite, search } = this.props;
    return favorite
      .filter(contact => {
        return contact.username.toLowerCase().search(search.toLowerCase()) !== -1;
      })
      .map(contact => (
        <ContactList
          key={contact.id}
          contact={contact}
          getContactCallBack={this.getContact}
          deleteContactCallBack={this.deleteContact}
          addFavoriteCallBack={this.addFavorite}
          deleteFavoriteCallBack={this.deleteFavorite}
          updateContactCallback={this.updateContact}
          star={favorite.some(item => item.id === contact.id)}
        />
      ));
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  };

  getContact = contact => {
    console.log('TLC: Home -> contact', contact);
    const { getContact } = this.props;
    getContact(contact);
    this.toggle();
  };

  deleteContact = contact => {
    const { deleteContact, deleteFavorite } = this.props;
    deleteContact(contact.id);
    deleteFavorite(contact.id);
  };

  updateContact = contact => {
    const { updateContact } = this.props;
    updateContact(contact.id);
  };

  addFavorite = contact => {
    const { addFavorite } = this.props;
    addFavorite(contact);
  };

  deleteFavorite = id => {
    const { deleteFavorite } = this.props;
    deleteFavorite(id);
  };

  render() {
    const { contactSelected } = this.props;

    // const { city } = (contactSelected || {}).address || {};

    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );
    return (
      <div>
        <Container className="homecontainer">
          {/* <Row className="firstrow">
            <Col xs="1" />
            <Col xs="3">Username</Col>
            <Col xs="3">Email</Col>
            <Col className="d-none d-lg-block" xs="3">
              Phone
            </Col>
            <Col xs="2" />
          </Row> */}
          <Row className="myrow">{this.renderContactList()}</Row>
        </Container>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            {contactSelected.username}{' '}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md={12}>
                <FaEnvelope className="mr-3" />
                {contactSelected.email}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {' '}
                <FaPhone className="mr-3" />
                {contactSelected.phone}
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contact: state.contact.contact,
    pending: state.contact.pending,
    error: state.contact.error,
    favorite: state.contact.favorite,
    search: state.contact.search,
    displayFavorite: state.contact.displayFavorite,
    contactSelected: state.contact.contactSelected,
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      getAllContact,
      getContact,
      deleteContact,
      addFavorite,
      deleteFavorite,
      updateContact,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
