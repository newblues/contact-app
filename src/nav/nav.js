import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';

import { FaUsers, FaStar } from 'react-icons/fa';
import { displayFavorite } from '../actions/index';

import styles from './nav.module.css';

import AddContact from '../add-contact/add-contact';
import SearchBar from '../search-bar/search-bar';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { contact, favorite, displayFavorite } = this.props;
    return (
      <div>
        <Navbar color="light" className="fixed-top" light expand="md">
          <div className={styles.left}>
            <Link to="/" onClick={() => displayFavorite(false)}>
              <FaUsers className={styles.icon} />
              <span className="ml-2 mr-2"> Contacts</span>
              <span className="mr-5">{contact.length}</span>
            </Link>
            <Link to="/favorite" onClick={() => displayFavorite(true)}>
              <FaStar className={styles.icon} />
              <span className="ml-2 mr-2"> Favorites</span>
              <span>{favorite.length}</span>
            </Link>
          </div>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>
                  {' '}
                  <SearchBar />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  {' '}
                  <AddContact />
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contact: state.contact.contact,
    favorite: state.contact.favorite,
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ displayFavorite }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
