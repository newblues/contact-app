import React from 'react';
import { connect } from 'react-redux';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { FaUsers, FaStar } from 'react-icons/fa';

import ModalExample from '../modal/modal';

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
    const { contact, favorite } = this.props;
    return (
      <div>
        <Navbar color="light" light expand="md">
          {/* <NavbarBrand href="/">Contact App</NavbarBrand> */}
          <ModalExample />
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#">
                  {' '}
                  <FaUsers />
                  Contacts {contact.length}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  <FaStar />
                  Favorites {favorite.length}
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
export default connect(
  mapStateToProps,
  null,
)(NavBar);
