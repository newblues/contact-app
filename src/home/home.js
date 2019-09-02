import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row } from 'reactstrap';

import { fetchContact, deleteContact, addFavorite, deleteFavorite } from '../actions/index';

import ContactList from '../contact-list/contact-list';
import './home.css';

class Home extends Component {
  //

  componentDidMount() {
    const { fetchContact } = this.props;
    fetchContact();
  }

  renderContactList = () => {
    const { contact, pending, favorite } = this.props;
    console.log('TLC: Home -> renderContactList -> contact', contact);

    if (pending) {
      return <h1>Loading...</h1>;
    }
    return contact.map(contact => (
      <ContactList
        key={contact.id}
        contact={contact}
        deleteContactCallBack={this.deleteContact}
        addFavoriteCallBack={this.addFavorite}
        deleteFavoriteCallBack={this.deleteFavorite}
        star={favorite.some(item => item.id === contact.id)}
      />
    ));
  };

  deleteContact = contact => {
    const { deleteContact, deleteFavorite } = this.props;
    deleteContact(contact.id);
    deleteFavorite(contact.id);
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
    return (
      <Container>
        <Row>{this.renderContactList()}</Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    contact: state.contact.contact,
    pending: state.contact.pending,
    error: state.contact.error,
    favorite: state.contact.favorite,
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ fetchContact, deleteContact, addFavorite, deleteFavorite }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
